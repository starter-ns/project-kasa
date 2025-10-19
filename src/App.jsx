import { Outlet, NavLink } from 'react-router-dom'
import logo from './assets/kasa.svg'           // header (red)
import whiteLogo from './assets/white-logo.svg' // footer (white)

export default function App() {
  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
      >
        <NavLink to="/" aria-label="Kasa home" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src={logo} alt="Kasa" style={{ height: 42 }} />
        </NavLink>

        <nav style={{ display: 'flex', gap: 16 }}>
          <NavLink to="/" end style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : 'none',
            color: '#ff6060',
            fontWeight: 500,
          })}>
            Home
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : 'none',
            color: '#ff6060',
            fontWeight: 500,
          })}>
            About
          </NavLink>
        </nav>
      </header>

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '0 20px 40px' }}>
        <Outlet />
      </main>

      <footer style={{ background: '#000', color: '#fff', textAlign: 'center', padding: '32px 16px' }}>
        <img src={whiteLogo} alt="Kasa" style={{ height: 30, marginBottom: 8 }} />
        <p>© {new Date().getFullYear()} Kasa. All rights reserved.</p>
      </footer>
    </>
  )
}
