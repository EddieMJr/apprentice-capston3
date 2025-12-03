import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem("role")  // "user", "admin", or null

  // Not logged in → treat as guest
  if (!role) {
    return <Navigate to="/login" replace />
  }

  // Logged in but not allowed
  if (!allowedRoles.includes(role)) {
    if (role === "user") return <Navigate to="/dashboard" replace />
    if (role === "admin") return <Navigate to="/admin" replace />
  }

  return children
}

export default ProtectedRoute
