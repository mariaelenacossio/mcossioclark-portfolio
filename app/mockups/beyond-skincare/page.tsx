import { MockupShell, Screen, SYSTEM_FONT } from '../_shared'

export const metadata = { robots: 'noindex' }

/* ─── Brand palette ───────────────────────────────────────────── */
const BRAND      = '#072AC8'         // royal blue
const BRAND_LIGHT= '#E8EDFF'
const CTA        = '#FCF300'         // citron yellow
const DARK_BG    = '#0A0A1A'         // dark surface
const TEXT_INK   = '#0F172A'
const TEXT_DIM   = '#64748B'
const RULE       = '#E5E7EB'
const SUCCESS    = '#10B981'
const CODE_BG    = '#F5F5F7'
const CODE_TEXT  = '#334155'

/* ─── Screen 1 — Component library overview ──────────────────── */
function ComponentLibraryScreen() {
  const SidebarSection = ({ label, items }: { label: string; items: { l: string; a?: boolean }[] }) => (
    <div style={{ marginBottom: 22 }}>
      <p style={{
        fontSize: 10, fontWeight: 700, color: TEXT_DIM, textTransform: 'uppercase',
        letterSpacing: 1.5, margin: '0 0 8px', padding: '0 4px',
      }}>{label}</p>
      {items.map(i => (
        <div key={i.l} style={{
          padding: '7px 10px', borderRadius: 6,
          fontSize: 13, fontWeight: i.a ? 700 : 500,
          color: i.a ? BRAND : TEXT_INK,
          background: i.a ? BRAND_LIGHT : 'transparent',
          cursor: 'pointer',
          marginBottom: 2,
        }}>{i.l}</div>
      ))}
    </div>
  )

  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: '#fff', color: TEXT_INK, display: 'grid', gridTemplateColumns: '240px 1fr 220px' }}>
      {/* Sidebar */}
      <div style={{ background: '#FAFAFA', borderRight: `1px solid ${RULE}`, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: BRAND,
            color: CTA, fontSize: 16, fontWeight: 900,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>B</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: TEXT_INK, margin: 0 }}>BEYOND</p>
            <p style={{ fontSize: 10, color: TEXT_DIM, margin: 0 }}>Design System v2.1</p>
          </div>
        </div>
        <SidebarSection label="Foundations" items={[
          { l: 'Colors' }, { l: 'Typography' }, { l: 'Spacing' },
        ]} />
        <SidebarSection label="Components" items={[
          { l: 'Buttons', a: true }, { l: 'Cards' }, { l: 'Forms' }, { l: 'Navigation' },
        ]} />
        <SidebarSection label="Patterns" items={[
          { l: 'Empty states' }, { l: 'Loading' },
        ]} />
        <SidebarSection label="Guidelines" items={[
          { l: 'Voice & tone' }, { l: 'Iconography' },
        ]} />
      </div>

      {/* Main content */}
      <div style={{ padding: 32, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: TEXT_INK, margin: 0 }}>Buttons</h2>
          <span style={{
            background: BRAND_LIGHT, color: BRAND, padding: '4px 10px',
            borderRadius: 999, fontSize: 11, fontWeight: 700,
          }}>20 variants</span>
        </div>
        <p style={{ fontSize: 13, color: TEXT_DIM, margin: '0 0 24px' }}>
          The primary call-to-action component. Use sparingly — one primary per view.
        </p>

        {/* Row 1 — Primary */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px' }}>Primary</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <button style={{ padding: '12px 22px', borderRadius: 8, border: 'none', background: BRAND, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Shop Now</button>
            <button style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: BRAND, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Shop Now</button>
            <button style={{ padding: '7px 14px', borderRadius: 6, border: 'none', background: BRAND, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Shop</button>
          </div>
          <code style={{ display: 'block', background: CODE_BG, color: CODE_TEXT, padding: '8px 12px', borderRadius: 6, fontSize: 12, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>
            {'<Button variant="primary" size="md">Shop Now</Button>'}
          </code>
        </div>

        {/* Row 2 — Secondary */}
        <div style={{ marginBottom: 22 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px' }}>Secondary</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <button style={{ padding: '10px 20px', borderRadius: 8, background: '#fff', color: BRAND, fontSize: 15, fontWeight: 700, border: `1.5px solid ${BRAND}`, cursor: 'pointer' }}>Learn more</button>
            <button style={{ padding: '7px 16px', borderRadius: 8, background: '#fff', color: BRAND, fontSize: 13, fontWeight: 700, border: `1.5px solid ${BRAND}`, cursor: 'pointer' }}>Learn more</button>
          </div>
          <code style={{ display: 'block', background: CODE_BG, color: CODE_TEXT, padding: '8px 12px', borderRadius: 6, fontSize: 12, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>
            {'<Button variant="secondary" size="md">Learn more</Button>'}
          </code>
        </div>

        {/* Row 3 — CTA */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 12px' }}>CTA</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <button style={{ padding: '12px 22px', borderRadius: 8, border: 'none', background: CTA, color: TEXT_INK, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Add to bag</button>
            <button style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: CTA, color: TEXT_INK, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Add to bag</button>
          </div>
          <code style={{ display: 'block', background: CODE_BG, color: CODE_TEXT, padding: '8px 12px', borderRadius: 6, fontSize: 12, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>
            {'<Button variant="cta" size="md">Add to bag</Button>'}
          </code>
        </div>
      </div>

      {/* Right panel — Props */}
      <div style={{ background: '#FAFAFA', borderLeft: `1px solid ${RULE}`, padding: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>Props</p>
        {[
          { p: 'variant',  t: 'primary | secondary | cta' },
          { p: 'size',     t: 'sm | md | lg' },
          { p: 'disabled', t: 'boolean' },
          { p: 'loading',  t: 'boolean' },
          { p: 'iconLeft', t: 'ReactNode' },
          { p: 'iconRight',t: 'ReactNode' },
        ].map(r => (
          <div key={r.p} style={{ padding: '10px 0', borderBottom: `1px solid ${RULE}` }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: TEXT_INK, margin: 0, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>{r.p}</p>
            <p style={{ fontSize: 11, color: TEXT_DIM, margin: '4px 0 0', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>{r.t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Screen 2 — Light vs Dark Theme ──────────────────────────── */
function ThemePreviewScreen() {
  const Card = ({ dark }: { dark?: boolean }) => {
    const bg = dark ? DARK_BG : '#fff'
    const text = dark ? '#FAFAF8' : TEXT_INK
    const accent = dark ? '#4470FF' : BRAND
    const subText = dark ? '#9CA3AF' : TEXT_DIM
    return (
      <div style={{
        background: dark ? '#13132A' : '#fff',
        borderRadius: 16, padding: 24,
        border: `1px solid ${dark ? '#252547' : RULE}`,
        boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          width: '100%', height: 160, background: dark ? '#1A1A38' : BRAND_LIGHT,
          borderRadius: 12, marginBottom: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: '50%',
            background: accent, opacity: 0.7,
          }} />
        </div>
        <p style={{ fontSize: 12, color: subText, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 4px' }}>Moisturizer</p>
        <p style={{ fontSize: 18, fontWeight: 800, color: text, margin: '0 0 4px' }}>BEYOND Daily Cream</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#F59E0B' }}>★★★★★</span>
          <span style={{ fontSize: 12, color: subText }}>4.9 (1.2k)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: text }}>$48</span>
          <button style={{
            padding: '8px 16px', borderRadius: 8, border: 'none',
            background: accent, color: dark ? '#fff' : '#fff',
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>Add to cart</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: '#fff', color: TEXT_INK, padding: 32, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT_INK, margin: 0 }}>Theme Preview</h2>
          <p style={{ fontSize: 13, color: TEXT_DIM, margin: '4px 0 0' }}>Same component, two themes — driven by semantic tokens.</p>
        </div>
        {/* Toggle */}
        <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: 999, padding: 3 }}>
          <button style={{
            padding: '8px 18px', borderRadius: 999, border: 'none',
            background: '#fff', color: TEXT_INK, fontSize: 13, fontWeight: 700,
            boxShadow: '0 1px 2px rgba(0,0,0,0.06)', cursor: 'pointer',
          }}>☀ Light</button>
          <button style={{
            padding: '8px 18px', borderRadius: 999, border: 'none',
            background: 'transparent', color: TEXT_DIM, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>☾ Dark</button>
        </div>
      </div>

      {/* Split preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: '#FAFAFA', borderRadius: 14, padding: 24, border: `1px solid ${RULE}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 14px' }}>Light theme</p>
          <Card />
        </div>
        <div style={{ background: DARK_BG, borderRadius: 14, padding: 24, border: '1px solid #252547' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 14px' }}>Dark theme</p>
          <Card dark />
        </div>
      </div>

      {/* Token table */}
      <div style={{ background: '#FAFAFA', borderRadius: 12, border: `1px solid ${RULE}`, overflow: 'hidden', flex: 1 }}>
        <div style={{ padding: '12px 18px', borderBottom: `1px solid ${RULE}`, background: '#fff' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>Semantic tokens — values resolve per theme</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
          fontSize: 12, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        }}>
          {[
            ['Token',          'Light',   'Dark'],
            ['--color-bg',     '#ffffff', '#0A0A1A'],
            ['--color-text',   '#0D0D0D', '#FAFAF8'],
            ['--color-accent', '#072AC8', '#4470FF'],
            ['--color-surface','#FAFAFA', '#13132A'],
            ['--color-border', '#E5E7EB', '#252547'],
          ].map((row, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {row.map((cell, j) => (
                <div key={j} style={{
                  padding: '10px 18px',
                  borderBottom: i < 5 ? `1px solid ${RULE}` : 'none',
                  background: i === 0 ? '#fff' : 'transparent',
                  fontWeight: i === 0 ? 700 : (j === 0 ? 600 : 500),
                  color: i === 0 ? TEXT_INK : (j === 0 ? BRAND : TEXT_INK),
                }}>
                  {j > 0 && i > 0 ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 14, height: 14, borderRadius: 3, background: cell, border: `1px solid ${RULE}` }} />
                      {cell}
                    </span>
                  ) : cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Screen 3 — WCAG Accessibility Audit ─────────────────────── */
function AccessibilityScreen() {
  const components = [
    'Button', 'IconButton', 'Input', 'Textarea', 'Select', 'Checkbox',
    'Radio', 'Toggle', 'Badge', 'Avatar', 'Card', 'Modal', 'Toast',
    'Tabs', 'Accordion', 'Dropdown', 'Navbar', 'Footer', 'Form', 'Pagination',
  ]
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: '#fff', color: TEXT_INK, padding: 32, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: TEXT_INK, margin: 0 }}>Accessibility</h2>
          <p style={{ fontSize: 13, color: TEXT_DIM, margin: '4px 0 0' }}>WCAG 2.1 AA conformance, audited with WAVE.</p>
        </div>
        <span style={{
          background: SUCCESS, color: '#fff', padding: '7px 16px', borderRadius: 999,
          fontSize: 12, fontWeight: 800, letterSpacing: 1,
        }}>✓ AA conformance</span>
      </div>

      {/* 4 conformance tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { l: 'Color contrast',   v: 'Built to AA' },
          { l: 'Keyboard nav',     v: 'Built to AA' },
          { l: 'Screen reader',    v: 'Built to AA' },
          { l: 'Touch targets',    v: 'Built to AA' },
        ].map(t => (
          <div key={t.l} style={{
            background: '#fff', borderRadius: 12, padding: 16,
            border: `1px solid ${RULE}`, borderLeft: `4px solid ${SUCCESS}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 12, color: TEXT_DIM, fontWeight: 600, margin: 0 }}>{t.l}</p>
              <span style={{ fontSize: 14, color: SUCCESS, fontWeight: 800 }}>✓</span>
            </div>
            <p style={{ fontSize: 18, fontWeight: 800, color: TEXT_INK, margin: '6px 0 0' }}>{t.v}</p>
          </div>
        ))}
      </div>

      {/* Brand contrast pairs, verified with WAVE (no invented ratios) */}
      <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 18, border: `1px solid ${RULE}`, marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>Brand contrast</p>
        {[
          { fg: '#072AC8', bg: '#FFFFFF', name: 'Blue on white'  },
          { fg: '#FCF300', bg: '#072AC8', name: 'Yellow on blue' },
          { fg: '#FAFAF8', bg: '#0A0A1A', name: 'White on dark'  },
        ].map(c => (
          <div key={c.name} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr auto',
            alignItems: 'center', gap: 16,
            padding: '8px 0', borderTop: c.name !== 'Blue on white' ? `1px solid ${RULE}` : 'none',
          }}>
            <div style={{
              padding: '10px 12px', background: c.bg, color: c.fg, borderRadius: 6,
              fontSize: 13, fontWeight: 700, textAlign: 'center', border: c.bg === '#FFFFFF' ? `1px solid ${RULE}` : 'none',
            }}>Aa</div>
            <span style={{ fontSize: 13, color: TEXT_INK, fontWeight: 500 }}>{c.name}</span>
            <span style={{
              background: SUCCESS, color: '#fff', padding: '3px 12px', borderRadius: 999,
              fontSize: 11, fontWeight: 800, textAlign: 'center', width: 'fit-content',
            }}>✓ Verified with WAVE</span>
          </div>
        ))}
      </div>

      {/* Components checklist */}
      <div style={{ background: '#FAFAFA', borderRadius: 12, padding: 18, border: `1px solid ${RULE}`, flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>Component checklist</p>
          <p style={{ fontSize: 11, color: TEXT_DIM, margin: 0 }}>20 components, built to WCAG 2.1 AA conformance</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {components.map(c => (
            <div key={c} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 10px', background: '#fff', borderRadius: 6, border: `1px solid ${RULE}`,
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: 4, background: SUCCESS, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700,
              }}>✓</span>
              <span style={{ fontSize: 12, color: TEXT_INK, fontWeight: 600 }}>{c}</span>
              <span style={{ fontSize: 9, color: TEXT_DIM, marginLeft: 'auto', fontFamily: 'ui-monospace, monospace' }}>aria + focus</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: TEXT_DIM, margin: '14px 0 0', textAlign: 'center' }}>
          Audited with WAVE · WCAG 2.1 AA conformance.
        </p>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function BeyondSkincareMockups() {
  return (
    <MockupShell title="BEYOND Skincare — Design System" brand={BRAND}>
      <Screen caption="Screen 1 of 3 — Component library overview">
        <ComponentLibraryScreen />
      </Screen>
      <Screen caption="Screen 2 of 3 — Light vs dark theme">
        <ThemePreviewScreen />
      </Screen>
      <Screen caption="Screen 3 of 3 — WCAG accessibility audit">
        <AccessibilityScreen />
      </Screen>
    </MockupShell>
  )
}
