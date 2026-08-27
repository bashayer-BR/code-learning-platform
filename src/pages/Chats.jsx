import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  collection, addDoc, query,
  orderBy, onSnapshot, serverTimestamp,
} from 'firebase/firestore';

function Chats() {
  const { lang }   = useLang();
  const navigate   = useNavigate();
  const { user }   = useAuth();

  const [sessions,        setSessions]        = useState([]);
  const [activeSession,   setActiveSession]   = useState(null);
  const [messages,        setMessages]        = useState([]);
  const [input,           setInput]           = useState('');
  const [loading,         setLoading]         = useState(false);
  const [sessionTitle,    setSessionTitle]    = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── جلب المحادثات ─────────────────────────
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'chats'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setSessions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  // ── جلب رسائل المحادثة الحالية ────────────
  useEffect(() => {
    if (!user || !activeSession) return;
    const q = query(
      collection(db, 'users', user.uid, 'chats', activeSession, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user, activeSession]);

  // ── إنشاء محادثة جديدة ────────────────────
  const createSession = async () => {
    if (!user) return;
    const title = sessionTitle.trim() ||
      (lang === 'ar' ? `محادثة ${sessions.length + 1}` : `Chat ${sessions.length + 1}`);
    const ref = await addDoc(
      collection(db, 'users', user.uid, 'chats'),
      { title, createdAt: serverTimestamp() }
    );
    setActiveSession(ref.id);
    setMessages([]);
    setSessionTitle('');
  };

  // ── إرسال رسالة ───────────────────────────
  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || !activeSession) return;
    setInput('');
    setLoading(true);

    // حفظ رسالة المستخدم
    await addDoc(
      collection(db, 'users', user.uid, 'chats', activeSession, 'messages'),
      { role: 'user', content: msg, createdAt: serverTimestamp() }
    );

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY_HERE',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: lang === 'ar'
            ? 'أنت مساعد برمجي خبير. أجب بالعربية بشكل واضح ومختصر.'
            : 'You are an expert coding assistant. Answer clearly and concisely.',
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: msg },
          ],
        }),
      });
      const data  = await response.json();
      const reply = data.content?.[0]?.text || '...';

      // حفظ رد الـ AI
      await addDoc(
        collection(db, 'users', user.uid, 'chats', activeSession, 'messages'),
        { role: 'assistant', content: reply, createdAt: serverTimestamp() }
      );
    } catch {
      await addDoc(
        collection(db, 'users', user.uid, 'chats', activeSession, 'messages'),
        {
          role: 'assistant',
          content: lang === 'ar' ? '❌ خطأ في الاتصال' : '❌ Connection error',
          createdAt: serverTimestamp(),
        }
      );
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>💬</div>
        <h2 className="fw-black mb-3">
          {lang === 'ar' ? 'سجّل دخولك أولاً' : 'Sign In First'}
        </h2>
        <button className="btn-primary" onClick={() => navigate('/auth')} style={{ padding: '12px 32px' }}>
          {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-4">
      <div className="row g-4" style={{ height: 'calc(100vh - 130px)' }}>

        {/* ── Sidebar: Sessions ────────────── */}
        <div className="col-lg-3 d-flex flex-column gap-3">
          <h2 className="fw-black mb-0" style={{ fontSize: 'var(--font-xl)' }}>
            {lang === 'ar' ? '💬 المحادثات' : '💬 Chats'}
          </h2>

          {/* New session input */}
          <div className="d-flex gap-2">
            <input
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              placeholder={lang === 'ar' ? 'اسم المحادثة...' : 'Chat name...'}
              onKeyDown={(e) => e.key === 'Enter' && createSession()}
              style={{
                flex: 1, padding: '8px 12px',
                borderRadius: 'var(--radius-m)',
                border: '1px solid var(--divider)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif',
                outline: 'none',
              }}
            />
            <button
              className="btn-primary"
              onClick={createSession}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-m)', whiteSpace: 'nowrap' }}
            >
              +
            </button>
          </div>

          {/* Sessions list */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {sessions.length === 0 ? (
              <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', textAlign: 'center', marginTop: '20px' }}>
                {lang === 'ar' ? 'لا يوجد محادثات بعد' : 'No chats yet'}
              </p>
            ) : (
              <div className="d-flex flex-column gap-2">
                {sessions.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveSession(s.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-m)',
                      cursor: 'pointer',
                      background: activeSession === s.id ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
                      border: `1px solid ${activeSession === s.id ? 'rgba(232, 130, 74, 0.3)' : 'var(--divider)'}`,
                      color: activeSession === s.id ? 'var(--primary)' : 'var(--text-primary)',
                      fontWeight: activeSession === s.id ? '700' : '400',
                      fontSize: 'var(--font-s)',
                      transition: 'var(--transition)',
                    }}
                  >
                    💬 {s.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Chat area ────────────────────── */}
        <div className="col-lg-9 d-flex flex-column">
          {activeSession ? (
            <div className="card d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.length === 0 && (
                  <div className="text-center" style={{ marginTop: '40px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🤖</div>
                    <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-m)' }}>
                      {lang === 'ar' ? 'ابدأ المحادثة...' : 'Start the conversation...'}
                    </p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginLeft: lang === 'ar' ? '10px' : '0',
                        marginRight: lang === 'ar' ? '0' : '10px', fontSize: '18px',
                      }}>
                        🤖
                      </div>
                    )}
                    <div style={{
                      maxWidth: '75%', padding: '12px 16px',
                      borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: msg.role === 'user' ? 'var(--gradient-primary)' : 'var(--bg-surface)',
                      color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                      fontSize: 'var(--font-s)', lineHeight: '1.7',
                      whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                    }}>🤖</div>
                    <div style={{
                      padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                      background: 'var(--bg-surface)', color: 'var(--text-hint)', fontSize: 'var(--font-s)',
                    }}>
                      {lang === 'ar' ? 'جاري التفكير...' : 'Thinking...'}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div style={{ padding: '16px', borderTop: '1px solid var(--divider)' }}>
                <div className="d-flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                    style={{
                      flex: 1, padding: '12px 16px',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--divider)',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--font-s)',
                      fontFamily: 'Cairo, sans-serif', outline: 'none',
                    }}
                  />
                  <button
                    className="btn-primary"
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    style={{ padding: '12px 20px', borderRadius: 'var(--radius-xl)' }}
                  >
                    {lang === 'ar' ? 'إرسال' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
              <div className="text-center">
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>💬</div>
                <h3 className="fw-black mb-2">
                  {lang === 'ar' ? 'اختر محادثة أو أنشئ جديدة' : 'Select a chat or create new'}
                </h3>
                <button className="btn-primary" onClick={createSession} style={{ padding: '12px 28px' }}>
                  {lang === 'ar' ? '+ محادثة جديدة' : '+ New Chat'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;