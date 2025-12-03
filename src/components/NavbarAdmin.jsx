import './styles/NavbarAdmin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLinkClick = () => setIsOpen(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    sessionStorage.clear()

    navigate("/")
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

        {/* MOBILE MENU — only logout */}
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li className="mobile-only">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* DESKTOP — only logout */}
      <div className="nav-login desktop-only">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default NavbarAdmin
