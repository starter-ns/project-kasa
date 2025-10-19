import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/data/logements.json')
      .then(r => r.json())
      .then(setItems)
      .catch(console.error)
  }, [])

  return (
    <section>
      <h1>Chez vous, partout et ailleurs</h1>
      <p>{items.length} logements chargés</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:16}}>
        {items.map(l => (
          <Link key={l.id} to={`/listing/${l.id}`} style={{textDecoration:'none'}}>
            <article style={{borderRadius:12,overflow:'hidden',background:'#eee'}}>
              <div style={{height:180,overflow:'hidden'}}>
                <img src={l.cover} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div style={{padding:12,color:'#ff6060',fontWeight:700}}>{l.title}</div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
