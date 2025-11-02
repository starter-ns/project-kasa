import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section style={{textAlign:'center',padding:'40px 0'}}>
      <h1 style={{fontSize:288,color:'#ff6060',margin:0}}>404</h1>
      <p style={{fontSize:36,color:'#ff6060',}}>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" style={{color:'#000000ff',textDecoration:'underline'}}>Return to home page</Link>
    </section>
  )
}
