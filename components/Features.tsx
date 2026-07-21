'use client'

const FEATURES = [
  {
    icon: '🧠',
    title: 'Page Intelligence',
    description:
      'Reads, summarises, and answers questions about any web page — instantly, without copying anything.',
    tag: 'Core',
    tagColor: '#1B7A4A',
  },
  {
    icon: '🔍',
    title: 'Research Agent',
    description:
      'Opens tabs, searches DuckDuckGo, reads results, and synthesises a report — all autonomously.',
    tag: 'Agent',
    tagColor: '#2D9CDB',
  },
  {
    icon: '🖥️',
    title: 'Computer Control',
    description:
      'Click, type, scroll, and extract — full browser automation using the Chrome Debugger Protocol.',
    tag: 'Automation',
    tagColor: '#E8A020',
  },
  {
    icon: '🔧',
    title: 'Agent Builder',
    description:
      'Build custom multi-step AI workflows visually. Chain research, navigation, extraction, and generation steps.',
    tag: 'Workflow',
    tagColor: '#9B51E0',
  },
  {
    icon: '💾',
    title: 'Persistent Memory',
    description:
      'Long-term vector memory per domain. The AI remembers what matters — without sending data to any cloud.',
    tag: 'Privacy',
    tagColor: '#5CDB95',
  },
  {
    icon: '🌍',
    title: 'POPIA First',
    description:
      'All processing runs locally via Ollama. No data leaves your machine. Fully compliant with South African law.',
    tag: 'Compliance',
    tagColor: '#EB5757',
  },
]

export default function Features() {
  return (
    <section
      id="features"
      style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <p className="section-label" style={{ marginBottom: 12 }}>
          Built Different
        </p>
        <h2
          className="heading-lg"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#E8EDF2', marginBottom: 16 }}
        >
          Everything Strawberry does —{' '}
          <span className="text-gradient-green">locally, freely.</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'rgba(232,237,242,0.55)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.65,
          }}
        >
          Six production-grade AI capabilities built for African businesses
          that can&apos;t afford cloud API costs.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  )
}

function FeatureCard({
  icon, title, description, tag, tagColor,
}: {
  icon: string
  title: string
  description: string
  tag: string
  tagColor: string
}) {
  return (
    <div
      className="glass"
      style={{
        borderRadius: 16,
        padding: '28px 28px 24px',
        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-4px)'
        el.style.borderColor = 'rgba(232,237,242,0.18)'
        el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'rgba(232,237,242,0.07)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Subtle gradient corner */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tagColor}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${tagColor}18`,
          border: `1px solid ${tagColor}35`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          marginBottom: 16,
        }}
      >
        {icon}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <h3
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 700,
            fontSize: 17,
            color: '#E8EDF2',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: tagColor,
            background: `${tagColor}15`,
            border: `1px solid ${tagColor}30`,
            padding: '2px 8px',
            borderRadius: 100,
            flexShrink: 0,
          }}
        >
          {tag}
        </span>
      </div>

      <p style={{ fontSize: 14, color: 'rgba(232,237,242,0.55)', lineHeight: 1.65, margin: 0 }}>
        {description}
      </p>
    </div>
  )
}
