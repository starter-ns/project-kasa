import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px'}}>
        <NavLink to="/" aria-label="Kasa home" style={{fontWeight:700,color:'#ff6060',textDecoration:'none'}}>Kasa</NavLink>
        <nav style={{display:'flex',gap:16}}>
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/about">À propos</NavLink>
        </nav>
      </header>

      <main style={{maxWidth:1240,margin:'0 auto',padding:'0 20px 40px'}}>
        <Outlet />
      </main>

      <footer style={{background:'#000',color:'#fff',textAlign:'center',padding:'32px 16px'}}>
        © {new Date().getFullYear()} Kasa
      </footer>
    </>
  )
}
