import { useEffect, useState } from 'react'
import api from '../services/api.js'
import "../App.css";

export default function Bookings() {
  const [items, setItems] = useState([])
  useEffect(() => { api.get('/bookings/me').then(res => setItems(res.data)) }, [])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My bookings</h2>
      <div className="space-y-3">
        {items.map(b => (
          <div key={b._id} className="border p-3 bg-white rounded">
            <div className="font-semibold">{b.listing?.title}</div>
            <div className="text-sm text-gray-600">{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</div>
            <div className="text-sm">₹{b.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
