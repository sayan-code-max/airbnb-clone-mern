import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../store/auth.js'
// import './Navbar.css'
import "../App.css";

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/', { replace: true })
    }
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <div className="header">
      <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none' }} className="Logo">
        Airbnb Clone
      </a>

      <nav className="navbar">
        <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none' }}>Home</a>
        <Link to="/listings" style={{ textDecoration: 'none' }}>Explore</Link>
        {user && <Link to="/listings/new" style={{ textDecoration: 'none' }}>List your place</Link>}
        {user ? (
          <>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                marginLeft: '40px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>Sign up</Link>
          </>
        )}
        <a href="/contact" onClick={handleContactClick} style={{ textDecoration: 'none' }}>Contact</a>
      </nav>
    </div>
  )
}
