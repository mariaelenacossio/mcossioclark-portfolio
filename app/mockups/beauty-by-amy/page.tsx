import { MockupShell, Screen, SYSTEM_FONT } from '../_shared'

export const metadata = { robots: 'noindex' }

/* ─── Brand palette ───────────────────────────────────────────── */
const BRAND       = '#A05549'   // dusty rose
const BRAND_LIGHT = '#CE8578'
const BRAND_TINT  = '#F5E8E4'
const CREAM       = '#FAF6F3'
const TEXT_INK    = '#0F172A'
const TEXT_DIM    = '#7C6F69'
const RULE        = '#E8DDD8'
const SUCCESS     = '#16A34A'
const WARN        = '#F59E0B'

/* ─── Screen 1 — Service Selection ────────────────────────────── */
function ServiceSelectionScreen() {
  const services = [
    { name: 'Lash Extensions',  dur: '90 min', price: '$120', emoji: '👁',    sel: false },
    { name: 'Brow Lamination',  dur: '60 min', price: '$75',  emoji: '✦',    sel: false },
    { name: 'Lash Lift',        dur: '60 min', price: '$85',  emoji: '🌙',    sel: true  },
    { name: 'Facial',           dur: '75 min', price: '$110', emoji: '🌸',    sel: false },
    { name: 'Makeup',           dur: '60 min', price: '$95',  emoji: '💄',    sel: false },
    { name: 'Combo Package',    dur: '150 min',price: '$220', emoji: '💎',    sel: false },
  ]
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: CREAM, color: TEXT_INK, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '20px 48px', background: '#fff', borderBottom: `1px solid ${RULE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <p style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 24, fontWeight: 700, color: BRAND, margin: 0,
            fontStyle: 'italic', letterSpacing: 0.5,
          }}>
            Beauty by Amy
          </p>
          <p style={{ fontSize: 11, color: TEXT_DIM, margin: '2px 0 0', letterSpacing: 1, textTransform: 'uppercase' }}>
            Vancouver · Open Tue–Sat
          </p>
        </div>
        <button style={{
          background: BRAND, color: '#fff', border: 'none', padding: '11px 22px',
          borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        }}>Book Appointment</button>
      </div>

      {/* Title + steps */}
      <div style={{ padding: '32px 48px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>
          Step 1 of 5
        </p>
        <h2 style={{
          fontSize: 30, fontWeight: 800, color: TEXT_INK, margin: '8px 0 6px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}>Choose your service</h2>
        <p style={{ fontSize: 14, color: TEXT_DIM, margin: 0 }}>
          Tap one to continue — you can adjust duration in the next step.
        </p>
      </div>

      {/* Service grid 3x2 */}
      <div style={{ padding: '8px 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
          {services.map(s => (
            <div key={s.name} style={{
              background: s.sel ? BRAND_TINT : '#fff',
              border: `2px solid ${s.sel ? BRAND : RULE}`,
              borderRadius: 14, padding: 18,
              position: 'relative', cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              {s.sel && (
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 24, height: 24, borderRadius: '50%', background: BRAND,
                  color: '#fff', fontSize: 12, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✓</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.emoji}</div>
              <p style={{ fontSize: 16, fontWeight: 700, color: TEXT_INK, margin: '0 0 6px' }}>{s.name}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 12, color: TEXT_DIM }}>⏱ {s.dur}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: BRAND }}>{s.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          width: '100%', padding: 14, borderRadius: 12, border: 'none',
          background: BRAND, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}>
          Next: Choose date &amp; time →
        </button>
      </div>
    </div>
  )
}

/* ─── Screen 2 — Date & Time Picker ───────────────────────────── */
function DateTimeScreen() {
  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: CREAM, color: TEXT_INK, display: 'flex', flexDirection: 'column' }}>
      {/* Header w/ progress */}
      <div style={{ padding: '20px 48px', background: '#fff', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: TEXT_DIM, cursor: 'pointer' }}>← Back</span>
          <p style={{
            fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700,
            fontStyle: 'italic', color: BRAND, margin: 0, flex: 1, textAlign: 'center',
          }}>Beauty by Amy</p>
          <span style={{ fontSize: 13, color: TEXT_DIM, cursor: 'pointer' }}>Save &amp; exit</span>
        </div>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: n <= 2 ? BRAND : RULE,
            }} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 48px 16px', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 24, alignItems: 'start' }}>
        {/* Calendar */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: `1px solid ${RULE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: TEXT_DIM, cursor: 'pointer' }}>‹</span>
            <p style={{ fontSize: 15, fontWeight: 700, color: TEXT_INK, margin: 0 }}>July 2026</p>
            <span style={{ fontSize: 13, color: TEXT_DIM, cursor: 'pointer' }}>›</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 6 }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: TEXT_DIM, fontWeight: 700, letterSpacing: 1, padding: 6 }}>{d}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 2 // start grid offset
              const isInMonth = day > 0 && day <= 31
              const isToday   = day === 9
              const isUnavail = [3, 7, 14, 21, 24, 28].includes(day)
              const isSelected= day === 20
              return (
                <div key={i} style={{
                  height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: isToday || isSelected ? 700 : 500,
                  color: !isInMonth ? 'transparent' : isSelected ? '#fff' : isUnavail ? '#C4B8B2' : isToday ? BRAND : TEXT_INK,
                  background: isSelected ? BRAND : isToday ? BRAND_TINT : 'transparent',
                  borderRadius: 8,
                  textDecoration: isUnavail ? 'line-through' : 'none',
                  cursor: isInMonth && !isUnavail ? 'pointer' : 'default',
                }}>
                  {isInMonth ? day : ''}
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: TEXT_DIM }}>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, background: BRAND, borderRadius: 2, verticalAlign: 'middle', marginRight: 5 }} /> Selected</span>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, background: BRAND_TINT, borderRadius: 2, verticalAlign: 'middle', marginRight: 5 }} /> Today</span>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#C4B8B2', borderRadius: 2, verticalAlign: 'middle', marginRight: 5 }} /> Unavailable</span>
          </div>
        </div>

        {/* Time slots */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: `1px solid ${RULE}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: TEXT_INK, margin: '0 0 4px' }}>Saturday, July 20</p>
          <p style={{ fontSize: 12, color: TEXT_DIM, margin: '0 0 18px' }}>Lash Lift · 60 min · select a time</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { t: '9:00 AM',   avail: true,  sel: false },
              { t: '10:30 AM',  avail: true,  sel: true  },
              { t: '12:00 PM',  avail: false, sel: false },
              { t: '2:00 PM',   avail: true,  sel: false },
              { t: '3:30 PM',   avail: true,  sel: false },
              { t: '5:00 PM',   avail: false, sel: false },
            ].map(slot => (
              <div key={slot.t} style={{
                padding: '12px',
                borderRadius: 10,
                border: `1.5px solid ${slot.sel ? BRAND : RULE}`,
                background: slot.sel ? BRAND : slot.avail ? '#fff' : '#F5F5F4',
                color: slot.sel ? '#fff' : slot.avail ? TEXT_INK : '#C4B8B2',
                fontSize: 13, fontWeight: 600,
                textAlign: 'center',
                textDecoration: slot.avail ? 'none' : 'line-through',
                cursor: slot.avail ? 'pointer' : 'not-allowed',
              }}>{slot.t}</div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 22, border: `1px solid ${RULE}` }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 14px' }}>Your booking</p>
          {[
            { k: 'Service',  v: 'Lash Lift'        },
            { k: 'Duration', v: '60 minutes'       },
            { k: 'Date',     v: 'Sat, Jul 20'      },
            { k: 'Time',     v: '10:30 AM'         },
          ].map(row => (
            <div key={row.k} style={{ padding: '9px 0', borderBottom: `1px dashed ${RULE}` }}>
              <p style={{ fontSize: 11, color: TEXT_DIM, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>{row.k}</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: TEXT_INK, margin: '2px 0 0' }}>{row.v}</p>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_INK }}>Subtotal</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: BRAND }}>$85</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 48px', borderTop: `1px solid ${RULE}`, background: '#fff', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '13px 30px', borderRadius: 12, border: 'none',
          background: BRAND, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>Next: Your details →</button>
      </div>
    </div>
  )
}

/* ─── Screen 3 — Admin Appointments View ──────────────────────── */
function AdminAppointmentsScreen() {
  const slots = [
    { time: '9:00 AM',  svc: 'Lash Extensions', client: 'Sarah M.',  dur: '90 min', status: 'Confirmed' as const },
    { time: '11:00 AM', svc: 'Brow Lamination', client: 'Jessica T.', dur: '60 min', status: 'Confirmed' as const },
    { time: '1:00 PM',  svc: null, client: null, dur: 'Available', status: 'Open' as const },
    { time: '2:30 PM',  svc: 'Makeup', client: 'Rachel K.', dur: '120 min', status: 'Pending' as const },
  ]
  const statusColor = (s: 'Confirmed' | 'Pending' | 'Open') =>
    s === 'Confirmed' ? SUCCESS : s === 'Pending' ? WARN : '#94A3B8'

  return (
    <div style={{ ...SYSTEM_FONT, width: 1280, height: 800, background: CREAM, color: TEXT_INK, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', background: '#fff', borderBottom: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 20, fontWeight: 800, color: TEXT_INK, margin: 0, fontFamily: 'Georgia, serif' }}>
            Amy's Dashboard
          </p>
          <p style={{ fontSize: 12, color: TEXT_DIM, margin: '4px 0 0' }}>Saturday, July 20, 2026 · 3 bookings today</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: '#fff', color: BRAND, border: `1.5px solid ${BRAND}`, padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Block time
          </button>
          <button style={{ background: BRAND, color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            + New booking
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 32px', background: '#fff', borderBottom: `1px solid ${RULE}`, display: 'flex', gap: 28 }}>
        {[
          { l: 'Today',    a: true  },
          { l: 'Upcoming', a: false },
          { l: 'Clients',  a: false },
          { l: 'Settings', a: false },
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

      {/* Body */}
      <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22, flex: 1, alignItems: 'start' }}>
        {/* Timeline */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: TEXT_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>Today's schedule</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {slots.map((s, i) => (
              <div key={i} style={{
                background: '#fff',
                borderRadius: 12, padding: 16,
                border: s.status === 'Open' ? `2px dashed ${RULE}` : `1px solid ${RULE}`,
                borderLeft: s.status !== 'Open' ? `4px solid ${statusColor(s.status)}` : `2px dashed ${RULE}`,
                display: 'flex', alignItems: 'center', gap: 16,
                opacity: s.status === 'Open' ? 0.7 : 1,
              }}>
                <div style={{ minWidth: 80 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: TEXT_INK, margin: 0 }}>{s.time}</p>
                  <p style={{ fontSize: 11, color: TEXT_DIM, margin: '2px 0 0' }}>{s.dur}</p>
                </div>
                <div style={{ flex: 1 }}>
                  {s.svc ? (
                    <>
                      <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_INK, margin: 0 }}>{s.svc}</p>
                      <p style={{ fontSize: 12, color: TEXT_DIM, margin: '3px 0 0' }}>{s.client}</p>
                    </>
                  ) : (
                    <p style={{ fontSize: 14, color: TEXT_DIM, fontStyle: 'italic', margin: 0 }}>Available block — tap to fill</p>
                  )}
                </div>
                <span style={{
                  padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800,
                  background: `${statusColor(s.status)}1A`, color: statusColor(s.status),
                }}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Summary */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: `1px solid ${RULE}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 12px' }}>Today's summary</p>
            {[
              { k: 'Bookings',     v: '3' },
              { k: 'Revenue',      v: '$380' },
              { k: 'Open slots',   v: '1' },
              { k: 'Total hours',  v: '4.5h' },
            ].map(row => (
              <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px dashed ${RULE}` }}>
                <span style={{ fontSize: 12, color: TEXT_DIM }}>{row.k}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: TEXT_INK }}>{row.v}</span>
              </div>
            ))}
          </div>

          {/* Client quick-view */}
          <div style={{ background: '#fff', borderRadius: 14, padding: 18, border: `1px solid ${RULE}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: BRAND, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 14px' }}>Latest client</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: BRAND_TINT,
                color: BRAND, fontSize: 16, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>SM</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: TEXT_INK, margin: 0 }}>Sarah M.</p>
                <p style={{ fontSize: 11, color: TEXT_DIM, margin: '2px 0 0' }}>4 visits · last 6 weeks ago</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: TEXT_DIM, margin: '0 0 4px' }}>📞 (604) 555-0181</p>
            <p style={{ fontSize: 12, color: TEXT_DIM, margin: '0 0 14px' }}>✉ sarah.m@email.com</p>
            <button style={{
              width: '100%', padding: '10px', borderRadius: 10, border: `1.5px solid ${BRAND}`,
              background: '#fff', color: BRAND, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>Send rebooking link</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function BeautyByAmyMockups() {
  return (
    <MockupShell title="Beauty by Amy" brand={BRAND}>
      <Screen caption="Screen 1 of 3 — Service selection (Step 1 of 5)">
        <ServiceSelectionScreen />
      </Screen>
      <Screen caption="Screen 2 of 3 — Date & time picker (Step 2 of 5)">
        <DateTimeScreen />
      </Screen>
      <Screen caption="Screen 3 of 3 — Admin appointments dashboard">
        <AdminAppointmentsScreen />
      </Screen>
    </MockupShell>
  )
}
