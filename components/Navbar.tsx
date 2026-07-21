'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(15, 25, 35, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(232,237,242,0.07)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1B7A4A, #22974F)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 16,
              color: 'white',
              letterSpacing: '-0.05em',
            }}
          >
            ∞
          </div>
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 700,
              fontSize: 18,
              color: '#E8EDF2',
              letterSpacing: '-0.02em',
            }}
          >
            Infinity AI
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(232,237,242,0.65)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#E8EDF2')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'rgba(232,237,242,0.65)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="https://github.com/Sakhileziya/vela-extension"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(232,237,242,0.7)',
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid rgba(232,237,242,0.12)',
              transition: 'all 0.2s',
            }}
          >
            GitHub
          </Link>
          <Link
            href="#download"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              padding: '7px 18px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1B7A4A, #22974F)',
              transition: 'opacity 0.2s',
            }}
          >
            Download Free
          </Link>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  )
}
