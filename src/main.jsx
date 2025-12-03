import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar.jsx"
import NavbarUser from "./components/NavbarUser.jsx"

import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import QuizGeneration from "./pages/PasswordSecurityQuiz.jsx"
import Game from "./components/Game.jsx"

import Footer from "./components/Footer.jsx"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"

function Layout() {
  const location = useLocation()
  const path = location.pathname

  // Pages for guest navbar
  const guestPages = ["/", "/login", "/register"]

  // Pages for logged-in navbar
  const userPages = ["/dashboard", "/game", "/quiz"]

  return (
    <>
      {guestPages.includes(path) && <Navbar />}
      {userPages.includes(path) && <NavbarUser />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<Game />} />
        <Route path="/quiz" element={<QuizGeneration />} />
      </Routes>

      <Footer />
    </>
  )
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
)