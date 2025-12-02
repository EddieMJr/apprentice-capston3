import './styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLinkClick = () => setIsOpen(false)

  const handleLogout = () => {
    // Clear user/auth data
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    sessionStorage.clear()

    // Redirect to homepage
    navigate("/")

    // Close mobile menu
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src="/capstone.png" alt="LockBox logo" />
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li className="mobile-only">
            <Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
          </li>

          <li className="mobile-only">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      <div className="nav-login desktop-only">
        <Link to="/dashboard"><button>Dashboard</button></Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
