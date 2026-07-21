import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import DemoChat from '@/components/DemoChat'

/* ─── Comparison Section ────────────────────────────────────── */
function Comparison() {
  const rows = [
    { feature: 'AI lives in your browser', infinity: true, others: false },
    { feature: 'Runs 100% offline', infinity: true, others: false },
    { feature: 'POPIA / local data residency', infinity: true, others: false },
    { feature: 'Zero API cost on free plan', infinity: true, others: false },
    { feature: 'Agent Builder (no-code workflows)', infinity: true, others: false },
    { feature: 'Computer Control (full automation)', infinity: true, others: false },
    { feature: 'Persistent long-term memory', infinity: true, others: false },
    { feature: 'Africa-first support & pricing', infinity: true, others: false },
  ]

  return (
    <section
      id="about"
      style={{
        padding: '96px 24px',
        background: 'rgba(21,32,48,0.3)',
        borderTop: '1px solid rgba(232,237,242,0.05)',
        borderBottom: '1px solid rgba(232,237,242,0.05)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>How We Compare</p>
          <h2 className="heading-lg" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#E8EDF2', marginBottom: 14 }}>
            Why choose{' '}
            <span className="text-gradient-green">Infinity AI?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(232,237,242,0.5)', maxWidth: 400, margin: '0 auto' }}>
            Global AI browser tools were built for Silicon Valley budgets.
            We built for yours.
          </p>
        </div>

        <div
          className="glass"
          style={{ borderRadius: 16, overflow: 'hidden' }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 140px 140px',
              padding: '14px 24px',
              borderBottom: '1px solid rgba(232,237,242,0.07)',
              background: 'rgba(15,25,35,0.5)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,237,242,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Feature</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#5CDB95', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>Infinity AI</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,237,242,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>Cloud AI Tools</span>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 140px 140px',
                padding: '14px 24px',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(232,237,242,0.04)' : 'none',
                alignItems: 'center',
                background: i % 2 === 0 ? 'transparent' : 'rgba(232,237,242,0.015)',
              }}
            >
              <span style={{ fontSize: 14, color: 'rgba(232,237,242,0.75)' }}>{row.feature}</span>
              <span style={{ textAlign: 'center', fontSize: 16, color: '#22974F' }}>✓</span>
              <span style={{ textAlign: 'center', fontSize: 14, color: 'rgba(232,237,242,0.2)' }}>✗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section
      id="download"
      style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(27,122,74,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: 16 }}>Get Started Today</p>
        <h2
          className="heading-lg"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: '#E8EDF2', marginBottom: 16 }}
        >
          Your AI co-worker is{' '}
          <span className="text-gradient-green">ready to install</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(232,237,242,0.55)', marginBottom: 36, lineHeight: 1.65 }}>
          Clone the repo, run{' '}
          <code
            style={{
              background: 'rgba(232,237,242,0.08)',
              padding: '2px 8px',
              borderRadius: 6,
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#5CDB95',
            }}
          >
            npm run build
          </code>
          , load into Chrome. Takes 3 minutes.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/Sakhileziya/vela-extension"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 36px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #1B7A4A 0%, #22974F 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 0 48px rgba(27,122,74,0.4)',
            }}
          >
            ↓ Clone on GitHub — Free
          </a>
          <a
            href="mailto:hello@infinity-ai.africa"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 28px',
              borderRadius: 12,
              border: '1px solid rgba(232,237,242,0.12)',
              background: 'rgba(21,32,48,0.6)',
              color: 'rgba(232,237,242,0.7)',
              fontWeight: 600,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            Book a Demo →
          </a>
        </div>

        <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(232,237,242,0.3)' }}>
          Requires Chrome + Ollama on your machine. Windows, macOS, Linux.
        </p>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <Comparison />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
      {/* Floating live AI demo — powered by Groq */}
      <DemoChat />
    </>
  )
}
