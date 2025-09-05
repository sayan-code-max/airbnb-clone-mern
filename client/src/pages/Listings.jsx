import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api.js'
import "../App.css";

export default function Listings() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [city, setCity] = useState('')

  const search = async () => {
    const res = await api.get('/listings', { params: { q, city } })
    setItems(res.data)
  }

  useEffect(() => { search() }, [])
console.log(items);

  return (
    <div className="listings-container">
      {/* Search bar */}
      <div className="listings-search" id="search-bar">
        <input placeholder="Search" value={q} onChange={e => setQ(e.target.value)} />
        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <button onClick={search} className="search-btn">Search</button>
      </div>

      {/* Listings grid */}
      <div className="listings-grid">
          {items.map(it => (
            <Link key={it._id} to={`/listings/${it._id}`} className="listing-card">
              <div className="image">
                <img
  src={it.images && it.images.length > 0 ? it.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
  alt={it.title}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>

              </div>
              <div className="details">
                <div className="title">{it.title}</div>
                <div className="location">{it.city}, {it.country}</div>
                <div className="price">
                  ₹{it.pricePerNight} <span>night</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
