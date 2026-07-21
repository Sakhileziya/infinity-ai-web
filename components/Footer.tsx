import Link from 'next/link'

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Roadmap', href: '#roadmap' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: 'mailto:hello@infinity-ai.africa' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'POPIA Notice', href: '#popia' },
    { label: 'Terms of Service', href: '#terms' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(232,237,242,0.06)', padding: '64px 24px 32px', background: 'rgba(15,25,35,0.8)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1B7A4A, #22974F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: 'white' }}>∞</div>
              <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: 17, color: '#E8EDF2' }}>Infinity AI</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(232,237,242,0.4)', lineHeight: 1.7, maxWidth: 260 }}>Africa&apos;s AI browser companion. Built local, compliant, and free.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="https://github.com/Sakhileziya/vela-extension" target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(232,237,242,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'rgba(232,237,242,0.5)', textDecoration: 'none' }}>GH</a>
            </div>
          </div>
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,237,242,0.35)', marginBottom: 16 }}>{section}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{ fontSize: 13, color: 'rgba(232,237,242,0.5)', textDecoration: 'none' }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(232,237,242,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(232,237,242,0.3)', margin: 0 }}>© 2026 Infinity AI (Pty) Ltd · Registered in South Africa · POPIA Compliant</p>
          <p style={{ fontSize: 12, color: 'rgba(232,237,242,0.2)', margin: 0 }}>v0.1.0 · Open Source · llama3.2:3b · nomic-embed-text</p>
        </div>
      </div>
    </footer>
  )
}
