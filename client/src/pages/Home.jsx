import { Link } from 'react-router-dom'
import "../App.css";



export default function Home() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-semibold mb-4">Find your next stay</h1>
      <p className="text-gray-600 mb-8">Search unique places to stay and things to do.</p>
      <Link to="/listings" className="px-6 py-3 rounded bg-black text-white">Start exploring</Link>
    </section>
  )
}
