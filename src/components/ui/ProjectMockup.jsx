/* ---------------------------------------------------------------
   ProjectMockup — SVG / CSS UI mockups for each case study
   Each mockup simulates a real screen to tell the design story
--------------------------------------------------------------- */

function BrowserFrame({ children, accent = '#C4786E', url = 'app.example.com' }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1C1C28', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded-md text-xs" style={{ background: '#2A2A38', color: '#666', fontFamily: 'monospace' }}>
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}

function MobileFrame({ children, accent = '#8B6AAE' }) {
  return (
    <div className="relative mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl" style={{ width: 200, background: '#111118', border: '2px solid rgba(255,255,255,0.12)' }}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl" style={{ background: '#111118', zIndex: 10 }} />
      <div style={{ height: 360, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
      {/* Home bar */}
      <div className="flex justify-center pb-2 pt-1" style={{ background: '#111118' }}>
        <div className="w-16 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  )
}

/* ---- SKINCARE MOCKUP ---- */
function SkincareMockup() {
  return (
    <div className="w-full p-4 flex gap-3">
      {/* Desktop: Skin quiz result */}
      <div className="flex-1 min-w-0">
        <BrowserFrame url="beyondskincare.com/your-profile" accent="#C4786E">
          <div style={{ background: '#FAF5F0', padding: '20px', minHeight: 280 }}>
            {/* Nav */}
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: 11, fontWeight: 700, color: '#8B4A42', letterSpacing: 2 }}>BEYOND</span>
              <div className="flex gap-3">
                {['Shop', 'About', 'Cart'].map(t => <span key={t} style={{ fontSize: 9, color: '#999' }}>{t}</span>)}
              </div>
            </div>
            {/* Profile card */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 14, marginBottom: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#D4A0A0,#C4786E)' }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#2C1810' }}>Your Skin Profile</div>
                  <div style={{ fontSize: 8, color: '#C4786E' }}>Combination · Acne-Prone · Sensitive</div>
                </div>
                <div style={{ marginLeft: 'auto', background: '#FFF0EE', border: '1px solid #C4786E', borderRadius: 20, padding: '2px 8px', fontSize: 8, color: '#C4786E' }}>Match: 94%</div>
              </div>
              <div className="flex gap-2">
                {['Hydration', 'Oil Control', 'Calm'].map((t, i) => (
                  <div key={t} style={{ flex: 1, background: i === 0 ? '#FFF0EE' : '#F5F5F5', borderRadius: 6, padding: '4px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 7, color: '#999', marginBottom: 2 }}>{t}</div>
                    <div style={{ height: 3, background: '#eee', borderRadius: 2 }}>
                      <div style={{ height: 3, width: `${[80, 60, 70][i]}%`, background: '#C4786E', borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Product grid */}
            <div style={{ fontSize: 9, color: '#888', marginBottom: 8 }}>✨ Curated for your skin — 12 products</div>
            <div className="grid grid-cols-3 gap-2">
              {[['Gentle Cleanser', '#D4A0A0', '#89'], ['Niacinamide Serum', '#C4786E', '#79'], ['SPF Moisturiser', '#8B4A42', '#94']].map(([name, c, match]) => (
                <div key={name} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ height: 50, background: `linear-gradient(135deg,${c}30,${c}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 28, height: 40, background: c, borderRadius: 4, opacity: 0.8 }} />
                  </div>
                  <div style={{ padding: '4px 6px' }}>
                    <div style={{ fontSize: 7, fontWeight: 600, color: '#2C1810', marginBottom: 1 }}>{name}</div>
                    <div style={{ fontSize: 6, color: '#C4786E' }}>✓ {match}% match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BrowserFrame>
      </div>
      {/* Mobile: Skin quiz */}
      <div className="flex-shrink-0">
        <MobileFrame accent="#C4786E">
          <div style={{ background: '#FAF5F0', height: '100%', padding: '24px 14px 14px' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 8, color: '#C4786E', letterSpacing: 2, marginBottom: 4 }}>STEP 2 OF 3</div>
              <div style={{ height: 3, background: '#eee', borderRadius: 2, marginBottom: 10 }}>
                <div style={{ height: 3, width: '66%', background: '#C4786E', borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2C1810', lineHeight: 1.3 }}>How does your skin feel by midday?</div>
            </div>
            {[['Oily & shiny', '✦'], ['Tight & dry', '◇'], ['Oily T-zone only', '●'], ['Mostly balanced', '○']].map(([label, icon], i) => (
              <div key={label} style={{ background: i === 2 ? '#C4786E' : '#fff', border: `1px solid ${i === 2 ? '#C4786E' : '#eee'}`, borderRadius: 10, padding: '10px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <span style={{ fontSize: 10, color: i === 2 ? '#fff' : '#C4786E' }}>{icon}</span>
                <span style={{ fontSize: 9, color: i === 2 ? '#fff' : '#444', fontWeight: i === 2 ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </MobileFrame>
      </div>
    </div>
  )
}

/* ---- BOOKING MOCKUP ---- */
function BookingMockup() {
  return (
    <div className="w-full p-4 flex gap-3 items-start">
      <div className="flex-1 min-w-0">
        <BrowserFrame url="beautybyamy.ca/book" accent="#8B6AAE">
          <div style={{ background: '#FAF7FE', minHeight: 280, padding: 20 }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontSize: 11, fontWeight: 700, color: '#5C3D7A', letterSpacing: 3, fontFamily: 'serif' }}>BEAUTY BY AMY</span>
              <div className="flex gap-3">
                {['Services', 'Gallery', 'Book'].map(t => <span key={t} style={{ fontSize: 9, color: t === 'Book' ? '#8B6AAE' : '#999', fontWeight: t === 'Book' ? 600 : 400 }}>{t}</span>)}
              </div>
            </div>
            {/* Progress stepper */}
            <div className="flex items-center gap-2 mb-5">
              {['Service', 'Date & Time', 'Confirm'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 1 ? '#8B6AAE' : i === 1 ? '#8B6AAE' : '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 8, color: i < 2 ? '#fff' : '#999', fontWeight: 700 }}>{i < 1 ? '✓' : i + 1}</span>
                    </div>
                    <span style={{ fontSize: 8, color: i < 2 ? '#8B6AAE' : '#999', fontWeight: i === 1 ? 600 : 400 }}>{step}</span>
                  </div>
                  {i < 2 && <div style={{ flex: 1, height: 1, background: i < 1 ? '#8B6AAE' : '#ddd', width: 20 }} />}
                </div>
              ))}
            </div>
            {/* Service cards */}
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5C3D7A', marginBottom: 10 }}>Choose Your Service</div>
            <div className="flex gap-3">
              {[
                { name: 'Balayage', time: '3h', price: '$220', popular: true },
                { name: 'Cut & Style', time: '1h', price: '$85', popular: false },
                { name: 'Keratin', time: '2.5h', price: '$180', popular: false },
              ].map(s => (
                <div key={s.name} style={{ flex: 1, background: s.popular ? '#F5F0FC' : '#fff', border: `1.5px solid ${s.popular ? '#8B6AAE' : '#eee'}`, borderRadius: 10, padding: 10, position: 'relative' }}>
                  {s.popular && <div style={{ position: 'absolute', top: -8, right: 8, background: '#8B6AAE', color: '#fff', fontSize: 7, padding: '2px 6px', borderRadius: 20 }}>Popular</div>}
                  <div style={{ height: 40, background: `linear-gradient(135deg, #B8A0CC30, #8B6AAE50)`, borderRadius: 6, marginBottom: 6 }} />
                  <div style={{ fontSize: 9, fontWeight: 600, color: '#2C1810' }}>{s.name}</div>
                  <div style={{ fontSize: 8, color: '#8B6AAE', marginTop: 2 }}>{s.time} · {s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </BrowserFrame>
      </div>
      <div className="flex-shrink-0">
        <MobileFrame accent="#8B6AAE">
          <div style={{ background: '#FAF7FE', height: '100%', padding: '24px 14px 14px' }}>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: '#8B6AAE', fontWeight: 700, marginBottom: 6 }}>BEAUTY BY AMY</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#5C3D7A' }}>Pick a date</div>
            </div>
            {/* Mini calendar */}
            <div style={{ background: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 8, color: '#999' }}>‹</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#5C3D7A' }}>April 2024</span>
                <span style={{ fontSize: 8, color: '#999' }}>›</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, textAlign: 'center' }}>
                {['S','M','T','W','T','F','S'].map(d => <span key={d+Math.random()} style={{ fontSize: 7, color: '#bbb' }}>{d}</span>)}
                {[...Array(30)].map((_, i) => (
                  <div key={i} style={{ fontSize: 8, color: i === 14 ? '#fff' : i % 7 === 0 || i % 7 === 6 ? '#ddd' : '#555', background: i === 14 ? '#8B6AAE' : 'transparent', borderRadius: 4, padding: '2px 0', fontWeight: i === 14 ? 700 : 400 }}>{i + 1}</div>
                ))}
              </div>
            </div>
            {/* Time slots */}
            <div style={{ fontSize: 8, color: '#999', marginBottom: 6 }}>Available times — Apr 15</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'].map((t, i) => (
                <div key={t} style={{ background: i === 2 ? '#8B6AAE' : '#fff', border: `1px solid ${i === 2 ? '#8B6AAE' : '#eee'}`, borderRadius: 6, padding: '6px', textAlign: 'center', fontSize: 8, color: i === 2 ? '#fff' : '#555', fontWeight: i === 2 ? 600 : 400 }}>{t}</div>
              ))}
            </div>
          </div>
        </MobileFrame>
      </div>
    </div>
  )
}

/* ---- DASHBOARD MOCKUP ---- */
function DashboardMockup() {
  return (
    <div className="w-full p-4">
      <BrowserFrame url="app.relocateme.io/dashboard" accent="#4A8FAE">
        <div style={{ background: '#0F1923', minHeight: 300, display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: 140, background: '#0D1620', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '14px 0' }}>
            <div style={{ padding: '0 12px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#4A8FAE', letterSpacing: 1 }}>relocateMe</div>
              <div style={{ fontSize: 7, color: '#555', marginTop: 2 }}>Rachel · HR Manager</div>
            </div>
            {[['🏠', 'Overview', true], ['👥', 'Employees', false], ['📄', 'Documents', false], ['⚠️', 'Alerts', false], ['⚙️', 'Settings', false]].map(([icon, label, active]) => (
              <div key={label} style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6, background: active ? 'rgba(74,143,174,0.12)' : 'transparent', borderLeft: active ? '2px solid #4A8FAE' : '2px solid transparent' }}>
                <span style={{ fontSize: 9 }}>{icon}</span>
                <span style={{ fontSize: 9, color: active ? '#4A8FAE' : '#555', fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
          {/* Main content */}
          <div style={{ flex: 1, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#E8F4F8' }}>Active Relocations</div>
                <div style={{ fontSize: 8, color: '#555', marginTop: 2 }}>4 employees in transit</div>
              </div>
              <div style={{ background: '#4A8FAE', color: '#fff', fontSize: 8, padding: '5px 10px', borderRadius: 6 }}>+ New Relocation</div>
            </div>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
              {[['4', 'Active', '#4A8FAE'], ['94%', 'Compliance', '#22C55E'], ['2', 'Overdue', '#EF4444']].map(([val, label, color]) => (
                <div key={label} style={{ background: '#1A2733', borderRadius: 8, padding: 10, borderLeft: `2px solid ${color}` }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color }}>{val}</div>
                  <div style={{ fontSize: 7, color: '#555' }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Employee rows */}
            {[
              { name: 'Sofia M.', from: 'Toronto → NYC', step: 3, total: 5, status: 'On track', color: '#22C55E' },
              { name: 'James K.', from: 'NYC → London', step: 2, total: 5, status: 'Docs due', color: '#F59E0B' },
              { name: 'Ana R.', from: 'Toronto → Miami', step: 5, total: 5, status: 'Complete', color: '#4A8FAE' },
            ].map(e => (
              <div key={e.name} style={{ background: '#1A2733', borderRadius: 8, padding: '8px 10px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2A3F52', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#4A8FAE', fontWeight: 700 }}>{e.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: '#E8F4F8', marginBottom: 2 }}>{e.name} <span style={{ color: '#555', fontWeight: 400 }}>· {e.from}</span></div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: e.total }, (_, i) => (
                      <div key={i} style={{ flex: 1, height: 3, background: i < e.step ? e.color : '#2A3F52', borderRadius: 2 }} />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 7, color: e.color, background: `${e.color}18`, padding: '2px 8px', borderRadius: 20 }}>{e.status}</div>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

/* ---- BAKERY MOCKUP ---- */
function BakeryMockup() {
  return (
    <div className="w-full p-4 flex gap-3">
      <div className="flex-1 min-w-0">
        <BrowserFrame url="losquequitosmx.ca" accent="#E08840">
          <div style={{ background: '#1A0A00', minHeight: 280 }}>
            {/* Hero band */}
            <div style={{ background: 'linear-gradient(135deg, #2D1A00, #1A0A00)', padding: '16px 20px', borderBottom: '1px solid rgba(224,136,64,0.2)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#E08840', letterSpacing: 2, fontFamily: 'serif' }}>Los Quequitos MX</div>
                  <div style={{ fontSize: 7, color: '#8B6030', letterSpacing: 4 }}>ARTISAN MEXICAN BAKERY · TORONTO</div>
                </div>
                <div style={{ background: '#E08840', color: '#1A0A00', fontSize: 8, fontWeight: 700, padding: '6px 12px', borderRadius: 4 }}>Pre-Order Now</div>
              </div>
            </div>
            {/* Menu grid */}
            <div style={{ padding: '14px 20px' }}>
              <div style={{ fontSize: 9, color: '#E08840', letterSpacing: 3, marginBottom: 10 }}>✦ THIS WEEK'S MENU</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  { name: 'Conchas', origin: 'Pan Dulce', price: '$3.50', color: '#8B4513' },
                  { name: 'Polvorones', origin: 'Shortbread', price: '$4.00', color: '#D4A017' },
                  { name: 'Cuernitos', origin: 'Croissant', price: '$3.00', color: '#C4924A' },
                ].map(item => (
                  <div key={item.name} style={{ background: '#2D1A00', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(224,136,64,0.15)' }}>
                    <div style={{ height: 55, background: `linear-gradient(135deg, ${item.color}60, ${item.color}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color, opacity: 0.8 }} />
                    </div>
                    <div style={{ padding: '6px 8px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#F5F0E8' }}>{item.name}</div>
                      <div style={{ fontSize: 7, color: '#8B6030', marginBottom: 3 }}>{item.origin}</div>
                      <div style={{ fontSize: 9, color: '#E08840', fontWeight: 600 }}>{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
      <div className="flex-shrink-0">
        <MobileFrame accent="#E08840">
          <div style={{ background: '#1A0A00', height: '100%', padding: '24px 14px 14px' }}>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#E08840', fontFamily: 'serif', letterSpacing: 1 }}>Pre-Order</div>
              <div style={{ fontSize: 7, color: '#8B6030', marginTop: 2 }}>Ready Sat + Sun pickup</div>
            </div>
            {/* Order items */}
            {[{ n: 'Conchas × 6', p: '$21.00' }, { n: 'Polvorones × 4', p: '$16.00' }].map(item => (
              <div key={item.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2D1A00', borderRadius: 8, padding: '8px 10px', marginBottom: 6, border: '1px solid rgba(224,136,64,0.15)' }}>
                <span style={{ fontSize: 8, color: '#F5F0E8' }}>{item.n}</span>
                <span style={{ fontSize: 8, color: '#E08840', fontWeight: 600 }}>{item.p}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(224,136,64,0.2)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 8, color: '#8B6030' }}>Total</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#E08840' }}>$37.00</span>
            </div>
            <div style={{ marginTop: 12, background: '#E08840', borderRadius: 8, padding: '10px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#1A0A00' }}>
              Confirm Pre-Order ✦
            </div>
            <div style={{ marginTop: 6, textAlign: 'center', fontSize: 7, color: '#8B6030' }}>Saturday, April 20 · 9 AM pickup</div>
          </div>
        </MobileFrame>
      </div>
    </div>
  )
}

export default function ProjectMockup({ type }) {
  switch (type) {
    case 'skincare':  return <SkincareMockup />
    case 'booking':   return <BookingMockup />
    case 'dashboard': return <DashboardMockup />
    case 'bakery':    return <BakeryMockup />
    default:          return null
  }
}
