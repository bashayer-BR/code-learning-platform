import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

function AI() {
  const { lang } = useLang();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'ar'
        ? 'مرحباً! أنا مساعدك البرمجي. كيف يمكنني مساعدتك اليوم؟ يمكنني شرح الكود، تصحيح الأخطاء، أو الإجابة على أسئلتك البرمجية.'
        : 'Hello! I\'m your coding assistant. How can I help you today? I can explain code, fix bugs, or answer your programming questions.',
    },
  ]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const messagesEndRef           = useRef(null);

  const quickQuestions = lang === 'ar'
    ? ['ما الفرق بين let و const؟', 'اشرح لي Flexbox', 'ما هو الـ API؟', 'كيف أتعلم React؟']
    : ['What is the difference between let and const?', 'Explain Flexbox', 'What is an API?', 'How to learn React?'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

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
            ? 'أنت مساعد برمجي خبير. أجب باللغة العربية بشكل واضح ومختصر. استخدم أمثلة كود عند الحاجة.'
            : 'You are an expert coding assistant. Answer clearly and concisely. Use code examples when needed.',
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || (lang === 'ar' ? 'لا يوجد رد' : 'No response');
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: lang === 'ar' ? '❌ خطأ في الاتصال' : '❌ Connection error',
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-4">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '🤖 مساعد AI البرمجي' : '🤖 AI Coding Assistant'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar'
            ? 'اسأل عن أي موضوع برمجي وسأساعدك فوراً'
            : 'Ask about any programming topic and I\'ll help you instantly'}
        </p>
      </div>

      <div className="row g-4">

        {/* ── Chat ─────────────────────────── */}
        <div className="col-lg-8">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div style={{
                      width: '36px', height: '36px',
                      borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: lang === 'ar' ? '10px' : '0',
                      marginRight: lang === 'ar' ? '0' : '10px',
                    }}>
                      🤖
                    </div>
                  )}
                  <div style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    background: msg.role === 'user'
                      ? 'var(--gradient-primary)'
                      : 'var(--bg-surface)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: 'var(--font-s)',
                    lineHeight: '1.7',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <div style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    🤖
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-hint)',
                    fontSize: 'var(--font-s)',
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
                  placeholder={lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-xl)',
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
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{ padding: '12px 20px', borderRadius: 'var(--radius-xl)' }}
                >
                  {lang === 'ar' ? 'إرسال' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ──────────────────────── */}
        <div className="col-lg-4 d-flex flex-column gap-3">

          {/* Quick questions */}
          <div className="card p-4">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '⚡ أسئلة سريعة' : '⚡ Quick Questions'}
            </h3>
            <div className="d-flex flex-column gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-m)',
                    border: '1px solid var(--divider)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--font-s)',
                    fontFamily: 'Cairo, sans-serif',
                    cursor: 'pointer',
                    textAlign: 'right',
                    transition: 'var(--transition)',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card p-4" style={{ background: 'rgba(232, 130, 74, 0.06)', border: '1px solid rgba(232, 130, 74, 0.2)' }}>
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '💡 نصائح' : '💡 Tips'}
            </h3>
            <div className="d-flex flex-column gap-2">
              {(lang === 'ar'
                ? ['الصق كودك مع سؤالك للحصول على مساعدة أفضل', 'اسأل عن مفهوم محدد', 'اطلب أمثلة عملية']
                : ['Paste your code with your question', 'Ask about a specific concept', 'Request practical examples']
              ).map((tip, i) => (
                <div key={i} className="d-flex gap-2 align-items-start">
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>•</span>
                  <span style={{ fontSize: 'var(--font-s)', color: 'var(--text-secondary)' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clear chat */}
          <button
            className="btn-secondary w-100"
            onClick={() => setMessages([{
              role: 'assistant',
              content: lang === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك؟' : 'Hello! How can I help you?',
            }])}
            style={{ padding: '12px' }}
          >
            {lang === 'ar' ? '🗑 مسح المحادثة' : '🗑 Clear Chat'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AI;