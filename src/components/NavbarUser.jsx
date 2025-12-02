import './styles/Navbar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when any link is clicked
  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav className="navbar">
      {/* LEFT SIDE: Logo + Nav Links */}
      <div className="nav-left">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src="/capstone.png" alt="LockBox logo" />
          </Link>
        </div>

        {/* Hamburger (visible only on mobile) */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Nav menu (Home, Scanner, and mobile Login/Register) */}
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/Knowledge Quiz" onClick={handleLinkClick}>Quiz</Link></li>
          <li><Link to="/Password Cracker" onClick={handleLinkClick}>Game</Link></li>
          <li className="mobile-only"><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
          <li className="mobile-only"><Link to="/register" onClick={handleLinkClick}>Register</Link></li>
        </ul>
      </div>

      {/* RIGHT SIDE (Desktop only) */}
      <div className="nav-login desktop-only">
        <Link to="/dashboard"><button>Dashboard</button></Link>
        <Link to="/logout"><button>Logout</button></Link>
      </div>
    </nav>
  )
}

export default Navbar