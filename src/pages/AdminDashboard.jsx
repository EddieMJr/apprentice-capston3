import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

    // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(data.accounts);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading admin dashboard...</p>;

  return (
    <div className="admin-container container py-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="card shadow p-4">
        <h2 className="text-center mb-4">User Management</h2>

        <table className="table table-striped table-hover text-center admin-table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>XP</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-muted">No users found.</td>
              </tr>
            )}

            {users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.xp}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
