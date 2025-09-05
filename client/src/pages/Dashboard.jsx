import useAuth from '../store/auth.js'
import "../App.css";

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <p>Welcome{user ? `, ${user.name}` : ''}!</p>
      <p className="text-gray-600">Manage listings and bookings (MVP placeholder).</p>
    </div>
  )
}
