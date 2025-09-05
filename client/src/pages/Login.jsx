import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import useAuth from '../store/auth.js'
import "../App.css";

export default function Login() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const onSubmit = async (data) => {
    const res = await api.post('/auth/login', data)
    setAuth(res.data.user, res.data.token)
    navigate('/')
  }
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input className="w-full border p-2" placeholder="Email" {...register('email')} />
        <input className="w-full border p-2" placeholder="Password" type="password" {...register('password')} />
        <button className="w-full bg-black text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
