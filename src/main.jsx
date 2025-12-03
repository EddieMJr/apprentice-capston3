import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar.jsx"
import NavbarUser from "./components/NavbarUser.jsx"
import NavbarAdmin from "./components/NavbarAdmin.jsx"

import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import QuizGeneration from "./pages/PasswordSecurityQuiz.jsx"
import Game from "./components/Game.jsx"

import Footer from "./components/Footer.jsx"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"

// Protected Route Component
function ProtectedRoute({ children, allowed }) {
  const user = JSON.parse(localStorage.getItem("user")) 

  if (!user) {
    // nobody logged in  directed as guest
    return <Navigate to="/login" replace />
  }

  if (!allowed.includes(user.role)) {
    // logged in but role not allowed
    return <Navigate to="/" replace />
  }

  return children
}

// Layout with Navbar Switching
function Layout() {
  const location = useLocation()
  const path = location.pathname

  const guestPages = ["/", "/login", "/register"]
  const userPages = ["/dashboard", "/game", "/quiz"]
  const adminPages = ["/admin"]

  return (
    <>
      {guestPages.includes(path) && <Navbar />}
      {userPages.includes(path) && <NavbarUser />}
      {adminPages.includes(path) && <NavbarAdmin />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User-only pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowed={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute allowed={["user", "admin"]}>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute allowed={["user", "admin"]}>
              <QuizGeneration />
            </ProtectedRoute>
          }
        />

        {/* Admin-only page */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowed={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
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


