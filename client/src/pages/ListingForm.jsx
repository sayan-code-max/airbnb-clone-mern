import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import "../App.css";

export default function ListingForm() {
  const { register, handleSubmit } = useForm({ defaultValues: { country:'India', pricePerNight: 1000, maxGuests: 2 } })
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    await api.post('/listings', data)
    navigate('/listings')
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">List your place</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <input className="border p-2" placeholder="Title" {...register('title')} />
        <textarea className="border p-2" placeholder="Description" {...register('description')} />
        <input className="border p-2" placeholder="Address" {...register('address')} />
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2" placeholder="City" {...register('city')} />
          <input className="border p-2" placeholder="Country" {...register('country')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2" type="number" placeholder="Price per night" {...register('pricePerNight', { valueAsNumber: true })} />
          <input className="border p-2" type="number" placeholder="Max guests" {...register('maxGuests', { valueAsNumber: true })} />
        </div>
        <button className="bg-black text-white p-2 rounded">Create</button>
      </form>
    </div>
  )
}
