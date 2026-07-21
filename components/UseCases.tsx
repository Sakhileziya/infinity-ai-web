'use client'

const CASES = [
  {
    persona: 'General Practitioner',
    location: 'Gauteng',
    use: 'Summarise patient records on any EMR portal. Draft referral letters from screen content. Research drug interactions instantly.',
    result: '2 hours saved per day',
    emoji: '🏥',
  },
  {
    persona: 'SME Owner',
    location: 'Durban',
    use: 'Research competitors, monitor pricing, draft client proposals, and generate weekly reports — all from one browser.',
    result: 'Zero staff overhead',
    emoji: '🏢',
  },
  {
    persona: 'Law Firm Associate',
    location: 'Cape Town',
    use: 'Extract clause summaries from contracts, search case law, and draft memos — without uploading files to any cloud.',
    result: 'POPIA compliant',
    emoji: '⚖️',
  },
  {
    persona: 'Freelance Developer',
    location: 'Nairobi',
    use: 'Build automated workflows to scrape leads, send proposals, and track invoices — using the visual Agent Builder.',
    result: '10x delivery speed',
    emoji: '💻',
  },
]

export default function UseCases() {
  return (
    <section
      id="use-cases"
      style={{
        padding: '96px 24px',
        background: 'rgba(21,32,48,0.4)',
        borderTop: '1px solid rgba(232,237,242,0.05)',
        borderBottom: '1px solid rgba(232,237,242,0.05)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>
            Real Impact
          </p>
          <h2
            className="heading-lg"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#E8EDF2', marginBottom: 16 }}
          >
            Built for how{' '}
            <span className="text-gradient-gold">Africa works</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(232,237,242,0.55)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Every professional, every sector. If it runs in a browser, Infinity AI can work with it.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {CASES.map((c) => (
            <div
              key={c.persona}
              className="glass"
              style={{ borderRadius: 16, padding: '28px 24px', position: 'relative' }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.emoji}</div>
              <div style={{ marginBottom: 8 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#E8EDF2',
                    margin: 0,
                  }}
                >
                  {c.persona}
                </p>
                <p style={{ fontSize: 12, color: 'rgba(232,237,242,0.4)', margin: '2px 0 0' }}>
                  {c.location}
                </p>
              </div>

              <p style={{ fontSize: 14, color: 'rgba(232,237,242,0.55)', lineHeight: 1.65, marginBottom: 20 }}>
                {c.use}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 100,
                  background: 'rgba(27,122,74,0.12)',
                  border: '1px solid rgba(27,122,74,0.3)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#5CDB95',
                }}
              >
                ✓ {c.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
