import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Listing() {
  const { id } = useParams()
  const [listing, setListing] = useState(undefined) // undefined = loading; null = not found

  useEffect(() => {
    fetch('/assets/data.json')
      .then(r => r.json())
      .then(all => setListing(all.find(x => x.id === id) ?? null))
      .catch(() => setListing(null))
  }, [id])

  if (listing === undefined) return <p>Chargement…</p>
  if (listing === null) return <p>Logement introuvable.</p>

  return (
    <article>
      <h1 style={{color:'#ff6060'}}>{listing.title}</h1>
      <p>{listing.location}</p>
      <div style={{height:320,borderRadius:12,overflow:'hidden',margin:'12px 0'}}>
        <img src={listing.pictures?.[0] || listing.cover} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
      </div>
      <p>{listing.description}</p>
    </article>
  )
}
