import { Link } from 'react-router-dom'
import '../styles/pages/NotFound.scss'

export default function NotFound() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Return to home page</Link>
    </section>
  )
}
