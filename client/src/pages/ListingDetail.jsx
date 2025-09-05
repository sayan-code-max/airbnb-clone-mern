import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'
import "../App.css";

export default function ListingDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [dates, setDates] = useState({ startDate: '', endDate: '' })
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    api.get(`/listings/${id}`).then(res => setItem(res.data))
  }, [id])

  const book = async () => {
    await api.post('/bookings', { listingId: id, startDate: dates.startDate, endDate: dates.endDate, guests })
    alert('Booked! Check your bookings page.')
  }

  if (!item) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold mb-2">{item.title}</h1>
        <div className="text-gray-600 mb-4">{item.city}, {item.country}</div>
        <p>{item.description}</p>
      </div>
      <div className="border rounded p-4 bg-white">
        <div className="text-xl font-semibold">₹{item.pricePerNight} <span className="text-sm text-gray-600">night</span></div>
        <div className="space-y-2 mt-3">
          <input type="date" className="w-full border p-2" value={dates.startDate} onChange={e=>setDates(d=>({...d,startDate:e.target.value}))} />
          <input type="date" className="w-full border p-2" value={dates.endDate} onChange={e=>setDates(d=>({...d,endDate:e.target.value}))} />
          <input type="number" min="1" className="w-full border p-2" value={guests} onChange={e=>setGuests(Number(e.target.value))} />
          <button onClick={book} className="w-full bg-black text-white rounded p-2">Reserve</button>
        </div>
      </div>
    </div>
  )
}
