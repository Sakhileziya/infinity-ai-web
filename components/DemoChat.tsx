'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id: string
}

const STARTE_PROMPTS = [
  'Summarise a web page for me',
  'Research my competitors in Africa',
  'Draft a client proposal email',
  'What is POPIA and how does it affect me?',
]

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: 'assistant',
      content:
        "Sawubona! I'm Infinity AI &#8212; your Africa-first browser companion. Ask me anything, or try one of the prompts below.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { id: uid(), role: 'user', content: text }
    const assistantMsg: Message = { id: uid(), role: 'assistant', content: '' }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setLoading(true)
    const ctrl = new AbortController()
    abortRef.current = ctrl
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: ctrl.signal,
      })
      if (!res.ok) throw new Error('API error')
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (data === '[DONE]') break
          try {
            const { text } = JSON.parse(data)
            if (text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id ? { ...m, content: m.content + text } : m
                )
              )
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: 'Something went wrong. Please try again.' } : m
          )
        )
      }
    } finally {
      setLoading(false)
    }
  }, [loading, messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Infinity AI demo"
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 200,
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1B7A4A, #22974F)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, boxShadow: '0 4px 24px rgba(27,122,74,0.5)', color: 'white',
          }}
        >
          ∞</button>
      )}
      {open && (
        <div
          style={{
            position: 'fixed', bottom: 24, right: 24, width: 380,
            maxWidth: 'calc(100vw - 32px)', height: 540,
            maxHeight: 'calc(100vh - 48px)', zIndex: 200,
            borderRadius: 20,
            background: 'rgba(15,25,35,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(232,237,242,0.1)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid rgba(232,237,242,0.07)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1B7A4A, #22974F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'white', fontWeight: 800 }}>∞/</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#E8EDF2' }}>Infinity AI</p>
                <span style={{ fontSize: 11, color: 'rgba(232,237,242,0.4)' }}>Powered by Groq · llama-3.3-70b</span>
              </div>
            </div>
            <button onClick={() => { abortRef.current?.abort(); setOpen(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,237,242,0.4)', fontSize: 18 }}>=</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg, #1B7A4A, #22974F)' : 'rgba(232,237,242,0.06)', border: msg.role === 'assistant' ? '1px solid rgba(232,237,242,0.07)' : 'none', fontSize: 13, lineHeight: 1.6, color: msg.role === 'user' ? 'white' : 'rgba(232,237,242,0.85)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {msg.content || ';…&}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {messages.length === 1 && (
            <div style={{ padding: '0 14px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
              {STARTE_PROMPTS.map((p) => (
                <button key={p} onClick={() => send(p)} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(232,237,242,0.6)', background: 'rgba(232,237,242,0.05)', border: '1px solid rgba(232,237,242,0.1)', borderRadius: 100, padding: '4px 10px', cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, padding: '10px 14px 14px', borderTop: '1px solid rgba(232,237,242,0.07)', flexShrink: 0 }}>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Infinity AI anything..." disabled={loading} style={{ flex: 1, background: 'rgba(232,237,242,0.06)', border: '1px solid rgba(232,237,242,0.1)', borderRadius: 10, padding: '9px 12px', fontSize: 13, color: '#E8EDF2', outline: 'none' }} />
            <button type="submit" disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 10, background: loading || !input.trim() ? 'rgba(232,237,242,0.06)' : 'linear-gradient(135deg, #1B7A4A, #22974F)', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', color: loading || !input.trim() ? 'rgba(232,237,242,0.3)' : 'white', fontSize: 14, flexShrink: 0 }}>{loading ? '…' : '↑'}</button>
          </form>
        </div>
      )}
    </>
  )
}
