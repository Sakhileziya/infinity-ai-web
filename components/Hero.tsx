'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const TYPED_PHRASES = [
  'Summarise this page for me...',
  'Research competitors in my industry...',
  'Draft a client email from this thread...',
  'Build me a workflow that runs daily...',
  'What are the key insights on screen?',
]

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let raf: number

    const tick = () => {
      const el = typedRef.current
      if (!el) return

      const current = TYPED_PHRASES[phraseIndex]

      if (!deleting) {
        charIndex++
        el.textContent = current.slice(0, charIndex)
        if (charIndex === current.length) {
          deleting = true
          setTimeout(() => { raf = requestAnimationFrame(tick) }, 2200)
          return
        }
      } else {
        charIndex--
        el.textContent = current.slice(0, charIndex)
        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % TYPED_PHRASES.length
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const timeout = setTimeout(() => { raf = requestAnimationFrame(tick) }, 800)
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(27,122,74,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(232,237,242,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(232,237,242,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 6px', borderRadius: 100, border: '1px solid rgba(27,122,74,0.4)', background: 'rgba(27,122,74,0.1)', marginBottom: 28, fontSize: 12, fontWeight: 600, color: '#5CDB95', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'rgba(27,122,74,0.3)', fontSize: 10 }}>🌍</span>
        Africa&apos;s First Local AI Browser Companion - Free Forever
      </div>

      <h1 className="heading-xl" style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: '#E8EDF2', maxWidth: 820, marginBottom: 20, position: 'relative', zIndex: 1 }}>
        Think smarter.
        <br />
        <span className="text-gradient-green">Work unlimited.</span>
      </h1>

      <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(232,237,242,0.6)', maxWidth: 560, marginBottom: 40, lineHeight: 1.65, position: 'relative', zIndex: 1 }}>
        Infinity AI lives inside your browser, works offline, keeps your data in South Africa, and costs nothing. Your AI co-worker - built for Africa.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 12, border: '1px solid rgba(232,237,242,0.1)', background: 'rgba(21,32,48,0.8)', backdropFilter: 'blur(12px)', marginBottom: 44, maxWidth: 560, width: '100%', position: 'relative', zIndex: 1 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22974F', flexShrink: 0 }} className="animate-pulse-dot" />
        <span style={{ fontSize: 14, color: 'rgba(232,237,242,0.45)', flexShrink: 0 }}>
          Ask anything:
        </span>
        <span ref={typedRef} style={{ fontSize: 14, color: '#E8EDF2', flex: 1, minWidth: 0 }} />
        <span className="animate-blink" style={{ fontSize: 16, color: '#22974F', flexShrink: 0 }}>|</span>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <Link
          href="https://github.com/Sakhileziya/vela-extension"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, background: 'linear-gradient(135deg, #1B7A4A 0%, #22974F 100%)', color: 'white', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 32px rgba(27,122,74,0.35)', transition: 'transform 0.15s, box-shadow 0.15s' }}
        >
          Download Extension - Free
        </Link>
        <Link
          href="#features"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, border: '1px solid rgba(232,237,242,0.12)', background: 'rgba(21,32,48,0.6)', color: 'rgba(232,237,242,0.8)', fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
        >
          Explore Features
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 44, position: 'relative', zIndex: 1 }}>
        {['POPIA Compliant', 'Zero API Cost', 'Runs Offline', 'Open Source', '100% Local Data'].map((badge) => (
          <span key={badge} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(232,237,242,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#22974F' }}>++</span>
            {badge}
          </span>
        ))}
      </div>
    </section>
  )
}
