'use client'

const PLANS = [
  {
    name: 'Free',
    price: 'R0',
    period: 'forever',
    description: 'For individuals and early adopters.',
    features: [
      'Page intelligence (unlimited)',
      'Research Agent — 5 runs/day',
      'Ollama local AI (fully private)',
      'POPIA consent & audit log',
      'Chrome Extension',
    ],
    cta: 'Download Free',
    ctaHref: 'https://github.com/Sakhileziya/vela-extension',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R149',
    period: 'per month',
    description: 'For professionals who need power.',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Research Agent — unlimited runs',
      'Computer Control & automation',
      'Agent Builder — 20 workflows',
      'Persistent long-term memory',
      'Groq Cloud AI (70B model)',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    ctaHref: '#download',
    highlighted: true,
  },
  {
    name: 'Team',
    price: 'R499',
    period: 'per seat / month',
    description: 'For SMEs and professional firms.',
    features: [
      'Everything in Pro',
      'Unlimited Agent Builder workflows',
      'Shared team memory & knowledge base',
      'Admin dashboard & usage analytics',
      'POPIA data residency guarantee',
      'Onboarding & setup session',
      'Dedicated Slack support',
    ],
    cta: 'Contact Sales',
    ctaHref: 'mailto:hello@infinity-ai.africa',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>
          Pricing
        </p>
        <h2
          className="heading-lg"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#E8EDF2', marginBottom: 16 }}
        >
          Start free.{' '}
          <span className="text-gradient-green">Scale when ready.</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'rgba(232,237,242,0.55)',
            maxWidth: 440,
            margin: '0 auto',
          }}
        >
          No per-token charges. No surprise bills. Flat, predictable pricing
          built for African budgets.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      <p
        style={{
          textAlign: 'center',
          marginTop: 40,
          fontSize: 13,
          color: 'rgba(232,237,242,0.35)',
        }}
      >
        All prices exclude VAT. Enterprise and government pricing available on request.
      </p>
    </section>
  )
}

function PricingCard({
  name, price, period, description, features, cta, ctaHref, highlighted, badge,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlighted: boolean
  badge?: string
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: '32px 28px',
        background: highlighted ? 'rgba(27,122,74,0.08)' : 'rgba(21,32,48,0.7)',
        backdropFilter: 'blur(20px)',
        border: highlighted ? '1px solid rgba(27,122,74,0.4)' : '1px solid rgba(232,237,242,0.07)',
        boxShadow: highlighted ? '0 0 40px rgba(27,122,74,0.15)' : 'none',
        position: 'relative',
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '4px 14px',
            borderRadius: 100,
            background: 'linear-gradient(135deg, #1B7A4A, #22974F)',
            fontSize: 11,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
          }}
        >
          {badge}
        </div>
      )}

      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: highlighted ? '#5CDB95' : 'rgba(232,237,242,0.4)',
          marginBottom: 12,
        }}
      >
        {name}
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 800,
            fontSize: 42,
            color: '#E8EDF2',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {price}
        </span>
        <span style={{ fontSize: 13, color: 'rgba(232,237,242,0.4)', marginBottom: 4 }}>
          /{period}
        </span>
      </div>

      <p style={{ fontSize: 13, color: 'rgba(232,237,242,0.5)', marginBottom: 28 }}>
        {description}
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'rgba(232,237,242,0.75)' }}>
            <span style={{ color: '#22974F', flexShrink: 0, marginTop: 1 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={ctaHref}
        target={ctaHref.startsWith('http') ? '_blank' : undefined}
        rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '12px',
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          background: highlighted
            ? 'linear-gradient(135deg, #1B7A4A, #22974F)'
            : 'rgba(232,237,242,0.06)',
          border: highlighted ? 'none' : '1px solid rgba(232,237,242,0.12)',
          color: highlighted ? 'white' : 'rgba(232,237,242,0.75)',
        }}
      >
        {cta}
      </a>
    </div>
  )
}
