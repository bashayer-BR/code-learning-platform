import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useLang } from '../context/LanguageContext';

function Editor() {
  const { lang } = useLang();

  const [code, setCode]             = useState('// اكتب كودك هنا\nconsole.log("Hello World!");');
  const [language, setLanguage]     = useState('javascript');
  const [output, setOutput]         = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer]     = useState('');
  const [loadingAI, setLoadingAI]   = useState(false);
  const [loadingRun, setLoadingRun] = useState(false);

  const languages = [
    { key: 'javascript', label: 'JavaScript', icon: '⚡' },
    { key: 'python',     label: 'Python',     icon: '🐍' },
    { key: 'html',       label: 'HTML',       icon: '🌐' },
    { key: 'css',        label: 'CSS',        icon: '🎨' },
  ];

  // ── تشغيل الكود ──────────────────────────
  const runCode = () => {
    setLoadingRun(true);
    setOutput('');
    try {
      if (language !== 'javascript') {
        setOutput(lang === 'ar'
          ? '⚠️ تشغيل الكود متاح للـ JavaScript فقط حالياً'
          : '⚠️ Code execution is only available for JavaScript currently');
        setLoadingRun(false);
        return;
      }

      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));

      // eslint-disable-next-line no-new-func
      new Function(code)();

      console.log = originalLog;
      setOutput(logs.join('\n') || (lang === 'ar' ? '✅ تم التنفيذ بنجاح' : '✅ Executed successfully'));
    } catch (e) {
      setOutput(`❌ Error: ${e.message}`);
    }
    setLoadingRun(false);
  };

  // ── سؤال الـ AI ───────────────────────────
  const askAI = async () => {
    if (!aiQuestion.trim()) return;
    setLoadingAI(true);
    setAiAnswer('');

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'system',
              content: lang === 'ar'
                ? 'أنت مساعد برمجي خبير. عندما يشارك المستخدم كوداً، حلله وأجب بدقة باللغة العربية.'
                : 'You are an expert coding assistant. When the user shares code, analyze it and answer accurately.',
            },
            {
              role: 'user',
              content: `الكود:\n\`\`\`${language}\n${code}\n\`\`\`\n\nالسؤال: ${aiQuestion}`,
            },
          ],
        }),
      });

      const data = await response.json();
      setAiAnswer(data.choices?.[0]?.message?.content || (lang === 'ar' ? 'لا يوجد رد' : 'No response'));
    } catch (e) {
      setAiAnswer(lang === 'ar' ? '❌ خطأ في الاتصال' : '❌ Connection error');
    }

    setLoadingAI(false);
  };

  return (
    <div className="container-fluid py-4 px-4">

      {/* ── Header ───────────────────────── */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="fw-black mb-1" style={{ fontSize: 'clamp(20px, 3vw, 30px)' }}>
            {lang === 'ar' ? '💻 المحرر التفاعلي' : '💻 Interactive Editor'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)' }}>
            {lang === 'ar' ? 'اكتب كودك وشغّله مع مساعدة AI' : 'Write and run your code with AI assistance'}
          </p>
        </div>

        {/* Language selector */}
        <div className="d-flex gap-2 flex-wrap">
          {languages.map((l) => (
            <button
              key={l.key}
              onClick={() => { setLanguage(l.key); setOutput(''); }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${language === l.key ? 'var(--primary)' : 'var(--divider)'}`,
                background: language === l.key ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
                color: language === l.key ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: language === l.key ? '700' : '500',
                fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">

        {/* ── Editor + Output ───────────────── */}
        <div className="col-lg-6">

          {/* Editor card */}
          <div className="card" style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div className="d-flex align-items-center justify-content-between p-3"
              style={{ borderBottom: '1px solid var(--divider)', background: 'var(--bg-surface)' }}>
              <span style={{ fontWeight: '700', fontSize: 'var(--font-s)' }}>
                📝 {lang === 'ar' ? 'الكود' : 'Code'} — {language}
              </span>
              <button
                className="btn-primary"
                onClick={runCode}
                disabled={loadingRun}
                style={{ padding: '6px 20px', fontSize: 'var(--font-s)' }}
              >
                {loadingRun
                  ? (lang === 'ar' ? 'جاري...' : 'Running...')
                  : (lang === 'ar' ? '▶ تشغيل' : '▶ Run')}
              </button>
            </div>

            <MonacoEditor
              height="380px"
              language={language}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-light"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontFamily: 'monospace',
                padding: { top: 12 },
                wordWrap: 'on',
              }}
            />
          </div>

          {/* Output */}
          <div className="card p-3">
            <div className="fw-bold mb-2" style={{ fontSize: 'var(--font-s)' }}>
              🖥 {lang === 'ar' ? 'النتيجة' : 'Output'}
            </div>
            <pre style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-m)',
              padding: '12px',
              fontSize: '13px',
              color: output.startsWith('❌') ? 'var(--red)' : 'var(--text-primary)',
              minHeight: '80px',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {output || (lang === 'ar' ? 'اضغط تشغيل لرؤية النتيجة...' : 'Press Run to see output...')}
            </pre>
          </div>
        </div>

        {/* ── AI Assistant ─────────────────── */}
        <div className="col-lg-6">
          <div className="card p-4 d-flex flex-column gap-3">
            <div>
              <div className="fw-black mb-1" style={{ fontSize: 'var(--font-l)' }}>
                🤖 {lang === 'ar' ? 'مساعد AI' : 'AI Assistant'}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', margin: 0 }}>
                {lang === 'ar'
                  ? 'AI يشوف كودك ويجاوب بدقة'
                  : 'AI sees your code and answers accurately'}
              </p>
            </div>

            {/* Quick questions */}
            <div className="d-flex flex-wrap gap-2">
              {(lang === 'ar'
                ? ['اشرح الكود', 'صحّح الأخطاء', 'حسّن الكود', 'أضف تعليقات']
                : ['Explain code', 'Fix errors', 'Optimize', 'Add comments']
              ).map((q) => (
                <button
                  key={q}
                  onClick={() => setAiQuestion(q)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--divider)',
                    background: aiQuestion === q ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-surface)',
                    color: aiQuestion === q ? 'var(--primary)' : 'var(--text-secondary)',
                    fontSize: 'var(--font-xs)',
                    fontFamily: 'Cairo, sans-serif',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <textarea
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
              rows={3}
              style={{
                width: '100%', padding: '12px',
                borderRadius: 'var(--radius-m)',
                border: '1px solid var(--divider)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif',
                resize: 'vertical', outline: 'none',
              }}
            />

            <button
              className="btn-primary w-100"
              onClick={askAI}
              disabled={loadingAI || !aiQuestion.trim()}
              style={{ padding: '12px' }}
            >
              {loadingAI
                ? (lang === 'ar' ? '🤔 جاري التفكير...' : '🤔 Thinking...')
                : (lang === 'ar' ? '🤖 اسأل AI' : '🤖 Ask AI')}
            </button>

            {/* AI Answer */}
            {aiAnswer && (
              <div style={{
                background: 'rgba(232, 130, 74, 0.06)',
                border: '1px solid rgba(232, 130, 74, 0.2)',
                borderRadius: 'var(--radius-m)',
                padding: '16px',
                fontSize: 'var(--font-s)',
                lineHeight: '1.8',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                overflowY: 'auto',
                maxHeight: '300px',
              }}>
                {aiAnswer}
              </div>
            )}

            {/* Clear */}
            {aiAnswer && (
              <button
                className="btn-secondary w-100"
                onClick={() => { setAiAnswer(''); setAiQuestion(''); }}
                style={{ padding: '8px' }}
              >
                {lang === 'ar' ? '🗑 مسح' : '🗑 Clear'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;