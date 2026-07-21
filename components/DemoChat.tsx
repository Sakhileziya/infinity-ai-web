'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

const STARTERS = [
  'Summarise this page',
  'Draft a reply email',
  'Research my competitors',
  'Explain this in simple terms',
]

export default function DemoChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I'\'m Infinity AI. Ask me anything about what\'\'s on your screen, or try one of the prompts below.', id: '0' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim(), id: Date.now().toString() }
    const assistantMsg: Message = { role: 'assistant', content: '', id: (Date.now() + 1).toString() }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setLoading(true)

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })) }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('No stream')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, content: m.content + delta } : m
                  )
                )
              }
            } catch {
              /* skip malformed chunks */
            }
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: 'Something went wrong. Please try again.' }
              : m
          )
        )
      }
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  return (
    <React.Fragment>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1B7A4A, #22974F)',
          border: 'none',
          color: 'white',
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(27,122,74,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'transform 0.2s',
        }}
        aria-label="Open chat"
      >
        {open ? 'X' : 'AI'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 96,
            right: 28,
            width: 360,
            maxHeight: 520,
            borderRadius: 20,
            background: 'rgba(15,25,35,0.97)',
            border: '1px solid rgba(232,237,242,0.1)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9998,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(232,237,242,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22974F' }} />
            <span style={{ fontWeight: 700, fontSize: 14, color: '#E8EDF2' }}>Infinity AI Demo</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(232,237,242,0.35)' }}>Powered by Groq</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '8px 12px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #1B7A4A, #22974F)' : 'rgba(232,237,242,0.07)',
                  color: '#E8EDF2',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}>
                  {m.content || (loading && m.role === 'assistant' ? '...' : '')}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Starters */}
          {messages.length === 1 && (
            <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 20, border: '1px solid rgba(27,122,74,0.4)', background: 'rgba(27,122,74,0.1)', color: '#5CDB95', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 16px 14px', borderTop: '1px solid rgba(232,237,242,0.08)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ask anything..."
              style={{ flex: 1, background: 'rgba(232,237,242,0.06)', border: '1px solid rgba(232,237,242,0.1)', borderRadius: 10, padding: '8px 12px', color: '#E8EDF2', fontSize: 13, outline: 'none' }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{ padding: '8px 14px', borderRadius: 10, background: loading ? 'rgba(27,122,74,0.3)' : '#1B7A4A', border: 'none', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14 }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
