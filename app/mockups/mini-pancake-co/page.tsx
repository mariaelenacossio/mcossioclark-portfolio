import { MockupShell, Screen, SYSTEM_FONT } from '../_shared'

export const metadata = { robots: 'noindex' }

/* ─── Brand palette ───────────────────────────────────────────── */
const BRAND       = '#F97316'
const BRAND_DARK  = '#C2410C'
const BRAND_LIGHT = '#FFEDD5'
const BG_CREAM    = '#FFFBF5'
const TEXT_INK    = '#0F172A'
const TEXT_DIM    = '#64748B'
const RULE        = '#E5E7EB'

/* ─── Reusable atoms (inline, not exported) ──────────────────── */
const NavLink = ({ children, active }: { children: string; active?: boolean }) => (
  <span style={{
    fontSize: 14,
    color: active ? TEXT_INK : TEXT_DIM,
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
  }}>
    {children}
  </span>
)

/* ─── Screen 1 — Shop / Product page ──────────────────────────── */
function ShopScreen() {
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: BG_CREAM, color: TEXT_INK }}>
      {/* Top nav */}
      <div style={{
        height: 72,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>🥞</span>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Mini Pancake Co.</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <NavLink active>Menu</NavLink>
          <NavLink>Book an Event</NavLink>
          <NavLink>About</NavLink>
          <button style={{
            background: BRAND, color: '#fff', border: 'none', padding: '10px 18px',
            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span>💬</span> Order via WhatsApp
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '40px 48px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Product image */}
        <div style={{
          background: BRAND_LIGHT, borderRadius: 16, height: 320,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{ fontSize: 120 }}>🥞</div>
          <div style={{
            position: 'absolute', top: 16, left: 16,
            background: '#fff', borderRadius: 999, padding: '5px 11px',
            fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 0.4,
          }}>BEST SELLER</div>
        </div>

        {/* Product details */}
        <div>
          <p style={{ fontSize: 12, color: BRAND, fontWeight: 700, letterSpacing: 1.5, margin: 0 }}>
            CLASSIC MENU
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: TEXT_INK, margin: '8px 0 12px', lineHeight: 1.1 }}>
            Classic Mini Pancakes
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: TEXT_INK }}>$12</span>
            <span style={{ fontSize: 15, color: TEXT_DIM }}>MXN / dozen</span>
          </div>
          <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.55, margin: '0 0 22px', maxWidth: 460 }}>
            Freshly made mini pancakes for events, parties &amp; corporate orders. Hand-flipped each morning, never frozen.
          </p>

          {/* Flavor selector */}
          <p style={{ fontSize: 12, fontWeight: 700, color: TEXT_INK, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1 }}>
            Flavor
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            {[
              { l: 'Original',  s: true  },
              { l: 'Blueberry', s: false },
              { l: 'Nutella',   s: false },
              { l: 'Seasonal',  s: false },
            ].map(f => (
              <div key={f.l} style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13, fontWeight: 600,
                border: `1.5px solid ${f.s ? BRAND : RULE}`,
                background: f.s ? BRAND : '#fff',
                color: f.s ? '#fff' : TEXT_INK,
                cursor: 'pointer',
              }}>
                {f.l}
              </div>
            ))}
          </div>

          {/* Quantity + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: TEXT_INK, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
              Quantity
            </p>
            <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${RULE}`, borderRadius: 8 }}>
              <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', fontSize: 18, color: BRAND, fontWeight: 700, cursor: 'pointer' }}>−</button>
              <span style={{ padding: '0 16px', fontSize: 14, fontWeight: 600 }}>1</span>
              <button style={{ width: 36, height: 36, border: 'none', background: 'transparent', fontSize: 18, color: BRAND, fontWeight: 700, cursor: 'pointer' }}>+</button>
            </div>
          </div>
          <button style={{
            width: '100%', padding: 14, borderRadius: 10, border: 'none',
            background: BRAND, color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span>💬</span> Order on WhatsApp · $12 MXN
          </button>
        </div>
      </div>

      {/* Related products */}
      <div style={{ padding: '0 48px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: TEXT_INK, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: 1.2 }}>
          You might also like
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { name: 'Pancake Tower',  price: '$95 MXN',  icon: '🥞' },
            { name: 'Party Pack',     price: '$350 MXN', icon: '🎉' },
            { name: 'Custom Order',   price: 'Quote',    icon: '✨' },
          ].map(p => (
            <div key={p.name} style={{
              background: '#fff', borderRadius: 12, padding: 16,
              border: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, background: BRAND_LIGHT,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
              }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_INK, margin: 0 }}>{p.name}</p>
                <p style={{ fontSize: 13, color: BRAND, fontWeight: 600, margin: '2px 0 0' }}>{p.price}</p>
              </div>
              <button style={{
                background: 'transparent', border: `1.5px solid ${BRAND}`, color: BRAND,
                padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Screen 2 — Booking wizard (Step 3 of 5) ─────────────────── */
function BookingScreen() {
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: BG_CREAM, color: TEXT_INK, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '20px 48px', background: '#fff', borderBottom: `1px solid ${RULE}`,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500, cursor: 'pointer' }}>← Back to home</span>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 700 }}>Book an event</span>
        <span style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500, cursor: 'pointer' }}>Save &amp; exit</span>
      </div>

      {/* Stepper */}
      <div style={{ padding: '24px 48px 20px', background: '#fff', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {[
            { l: 'Date',       s: 'done'    },
            { l: 'Party Size', s: 'done'    },
            { l: 'Menu',       s: 'active'  },
            { l: 'Details',    s: 'pending' },
            { l: 'Confirm',    s: 'pending' },
          ].map((step, i) => (
            <div key={step.l} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step.s === 'done' ? BRAND : step.s === 'active' ? BRAND : '#F1F5F9',
                color: step.s === 'pending' ? TEXT_DIM : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                border: step.s === 'active' ? `3px solid ${BRAND_LIGHT}` : 'none',
              }}>
                {step.s === 'done' ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 13, fontWeight: step.s === 'active' ? 700 : 500,
                color: step.s === 'pending' ? TEXT_DIM : TEXT_INK,
              }}>{step.l}</span>
              {i < 4 && <div style={{ flex: 1, height: 2, background: step.s === 'done' ? BRAND : RULE, borderRadius: 1 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Body — main + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, padding: '32px 48px', flex: 1, alignItems: 'start' }}>
        {/* Main */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT_INK, margin: '0 0 6px' }}>Choose your menu</h2>
          <p style={{ fontSize: 14, color: TEXT_DIM, margin: '0 0 22px' }}>
            Select a package or contact us for custom orders.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { name: 'Classic', qty: '3 dozen',      price: '$350 MXN', selected: true  },
              { name: 'Party',   qty: '6 dozen',      price: '$650 MXN', selected: false },
              { name: 'Custom',  qty: 'You decide',   price: 'Contact us', selected: false },
            ].map(p => (
              <div key={p.name} style={{
                border: `2px solid ${p.selected ? BRAND : RULE}`,
                background: p.selected ? '#FFF7ED' : '#fff',
                borderRadius: 14, padding: 20, position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 22, height: 22, borderRadius: '50%',
                  border: `2px solid ${p.selected ? BRAND : RULE}`,
                  background: p.selected ? BRAND : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {p.selected && <span style={{ color: '#fff', fontSize: 12 }}>●</span>}
                </div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🥞</div>
                <p style={{ fontSize: 16, fontWeight: 800, color: TEXT_INK, margin: '0 0 4px' }}>{p.name}</p>
                <p style={{ fontSize: 13, color: TEXT_DIM, margin: '0 0 12px' }}>{p.qty} of mini pancakes</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: BRAND, margin: 0 }}>{p.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar — order summary */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: 22,
          border: `1px solid ${RULE}`, position: 'sticky', top: 0,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 1.4, textTransform: 'uppercase', margin: '0 0 14px' }}>
            Order summary
          </p>
          {[
            { k: 'Date',       v: 'Sat, Jul 20'  },
            { k: 'Party size', v: '40 guests'    },
            { k: 'Package',    v: 'Classic'      },
          ].map(row => (
            <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px dashed ${RULE}` }}>
              <span style={{ fontSize: 13, color: TEXT_DIM }}>{row.k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_INK }}>{row.v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, marginTop: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_INK }}>Subtotal</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: BRAND }}>$350 MXN</span>
          </div>
          <p style={{ fontSize: 11, color: TEXT_DIM, margin: '12px 0 0' }}>Final total confirmed in step 5.</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 48px', background: '#fff', borderTop: `1px solid ${RULE}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button style={{
          padding: '11px 22px', borderRadius: 10, border: `1.5px solid ${RULE}`,
          background: 'transparent', color: TEXT_INK, fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>← Back</button>
        <span style={{ fontSize: 13, color: TEXT_DIM }}>Step 3 of 5</span>
        <button style={{
          padding: '11px 28px', borderRadius: 10, border: 'none',
          background: BRAND, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>Continue →</button>
      </div>
    </div>
  )
}

/* ─── Screen 3 — Admin dashboard ──────────────────────────────── */
function AdminScreen() {
  const orders = [
    { id: '#1024', cust: 'Sofía R.',  date: 'Today, 2 PM',  items: '6 dozen Classic',  total: '$650', status: 'Pending',   color: '#F59E0B' },
    { id: '#1023', cust: 'Diego M.',  date: 'Today, 11 AM', items: '3 dozen Nutella',  total: '$385', status: 'Confirmed', color: '#10B981' },
    { id: '#1022', cust: 'Ana K.',    date: 'Today, 9 AM',  items: 'Party Pack',       total: '$420', status: 'Confirmed', color: '#10B981' },
    { id: '#1021', cust: 'Luis P.',   date: 'Yesterday',    items: '12 dozen Classic', total: '$1,200', status: 'Completed', color: '#6B7280' },
    { id: '#1020', cust: 'Maya T.',   date: 'Yesterday',    items: '4 dozen mixed',    total: '$520', status: 'Completed', color: '#6B7280' },
  ]
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: '#F8FAFC', color: TEXT_INK }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', background: '#fff', borderBottom: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: TEXT_INK, margin: 0 }}>
            Mini Pancake Co. <span style={{ color: TEXT_DIM, fontWeight: 500 }}>· Admin</span>
          </h2>
          <p style={{ fontSize: 12, color: TEXT_DIM, margin: '4px 0 0' }}>Saturday, July 20, 2026</p>
        </div>
        <button style={{ background: BRAND, color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          + New Order
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 32px', background: '#fff', borderBottom: `1px solid ${RULE}`, display: 'flex', gap: 28 }}>
        {[
          { l: 'Orders',    a: true },
          { l: 'Menu',      a: false },
          { l: 'Settings',  a: false },
        ].map(t => (
          <div key={t.l} style={{
            padding: '14px 0',
            fontSize: 14, fontWeight: t.a ? 700 : 500,
            color: t.a ? BRAND : TEXT_DIM,
            borderBottom: t.a ? `3px solid ${BRAND}` : '3px solid transparent',
            cursor: 'pointer',
          }}>{t.l}</div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ padding: '20px 32px 12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { l: "Today's Orders", v: '12',          color: BRAND },
          { l: 'Pending',         v: '3',           color: '#F59E0B' },
          { l: 'Completed',       v: '8',           color: '#10B981' },
          { l: 'Revenue',         v: '$4,200 MXN',  color: TEXT_INK },
        ].map(stat => (
          <div key={stat.l} style={{ background: '#fff', borderRadius: 12, padding: 16, border: `1px solid ${RULE}` }}>
            <p style={{ fontSize: 11, color: TEXT_DIM, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>{stat.l}</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: stat.color, margin: '6px 0 0' }}>{stat.v}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: '12px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${RULE}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '80px 1.5fr 1.2fr 1.5fr 1fr 1fr 80px',
            padding: '12px 18px', background: '#F8FAFC', borderBottom: `1px solid ${RULE}`,
            fontSize: 11, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', gap: 12,
          }}>
            <span>Order</span>
            <span>Customer</span>
            <span>Date</span>
            <span>Items</span>
            <span>Total</span>
            <span>Status</span>
            <span></span>
          </div>
          {orders.map((o, i) => (
            <div key={o.id} style={{
              display: 'grid', gridTemplateColumns: '80px 1.5fr 1.2fr 1.5fr 1fr 1fr 80px',
              padding: '14px 18px', borderBottom: i < orders.length - 1 ? `1px solid ${RULE}` : 'none',
              fontSize: 13, alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontWeight: 700, color: BRAND }}>{o.id}</span>
              <span style={{ fontWeight: 600, color: TEXT_INK }}>{o.cust}</span>
              <span style={{ color: TEXT_DIM }}>{o.date}</span>
              <span style={{ color: TEXT_INK }}>{o.items}</span>
              <span style={{ fontWeight: 700, color: TEXT_INK }}>{o.total}</span>
              <span style={{
                display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                background: `${o.color}1A`, color: o.color, fontSize: 11, fontWeight: 700, width: 'fit-content',
              }}>{o.status}</span>
              <span style={{ color: TEXT_DIM, fontSize: 16, cursor: 'pointer', textAlign: 'right' }}>⋯</span>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
          <span style={{ fontSize: 12, color: TEXT_DIM }}>Showing 1–5 of 32 orders</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['‹', '1', '2', '3', '4', '›'].map((p, i) => (
              <button key={i} style={{
                minWidth: 30, height: 30, borderRadius: 6,
                border: `1px solid ${i === 1 ? BRAND : RULE}`,
                background: i === 1 ? BRAND : '#fff',
                color: i === 1 ? '#fff' : TEXT_INK,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function MiniPancakeMockups() {
  return (
    <MockupShell title="Mini Pancake Co." brand={BRAND}>
      <Screen caption="Screen 1 of 3 — Shop / Product page">
        <ShopScreen />
      </Screen>
      <Screen caption="Screen 2 of 3 — Booking wizard (Step 3 of 5)">
        <BookingScreen />
      </Screen>
      <Screen caption="Screen 3 of 3 — Admin dashboard">
        <AdminScreen />
      </Screen>
    </MockupShell>
  )
}
