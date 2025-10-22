import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Listing from './Listing.jsx'

// --- Banner component (inline, no need for a separate file) ---
function Banner({ title, imageUrl, width = 335}) {
  return (
    <section
      aria-label={title}
      style={{
        padding: "16 24",
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        height: 111,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45))',
        }}
      />

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1, paddingInline: 16 }}>
        <h1
          style={{
            margin: 0,
            alignItems: 'center',
            color: '#fff',
            fontWeight: 700,
            lineHeight: 1.1,
            fontSize: 24,
            textShadow: '0 2px 8px rgba(0,0,0,.35)',
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  )
}

// --- Main page ---
export default function HomePage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/data/logements.json')
      .then(r => r.json())
      .then(setItems)
      .catch(console.error)
  }, [])

  return (
    <section style={{ display: 'grid', gap: 24, padding: '0' }}>
      {/* Banner */}
      <Banner
        title="At home, everywhere, and anywhere"
        imageUrl="./src/assets/bannerPic.jpg"
        height={220}
      />

      {/* Listing grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
          gap: 16,
        }}
      >
        {items.map(l => (
          <Link
            key={l.id}
            to={`/listing/${l.id}`}
            style={{ textDecoration: 'none' }}
          >
            <article
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                background: '#eee',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ height: 180, overflow: 'hidden' }}>
                <img
                  src={l.cover}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  padding: 12,
                  color: '#ff6060',
                  fontWeight: 700,
                }}
              >
                {l.title}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
