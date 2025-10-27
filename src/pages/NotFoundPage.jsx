import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section style={{textAlign:'center',padding:'40px 0'}}>
      <h1 style={{fontSize:72,color:'#ff6060',margin:0}}>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" style={{color:'#ff6060',textDecoration:'underline'}}>Return to home page</Link>
    </section>
  )
}
