import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leaderboard`);
        const data = await res.json();

        if (res.ok) {
          const currentUser = JSON.parse(localStorage.getItem("user"));
          setUser(currentUser);

          const sorted = data.accounts.sort((a, b) => b.xp - a.xp);
          setLeaderboard(sorted);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container py-4">

      {/* Welcome */}
      <h1 className="text-center my-4">
        Welcome, {user.username}!
      </h1>

      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-12 col-lg-8">

          {/* Stats Section */}
          <div className="card shadow mb-4">
            <div className="card-body" style={{ padding: '3rem' }}>
              <h2 className="text-center mb-4">Your Personal Stats</h2>

              <div className="row g-3 justify-content-center">
                <div className="col-10 col-md-5">
                  <div
                    className="card text-white text-center p-3 shadow-sm"
                    style={{ backgroundColor: '#bb7420' }}
                  >
                    <h5 className="mb-1">Total Points</h5>
                    <p className="fw-bold fs-4">{user.xp} xp</p>
                  </div>
                </div>

                <div className="col-10 col-md-5">
                  <div
                    className="card text-white text-center p-3 shadow-sm"
                    style={{ backgroundColor: '#bb7420' }}
                  >
                    <h5 className="mb-1">Total Attempts</h5>
                    <p className="fw-bold fs-4">{user.totalAttempts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Skills & Assessment */}
          <div className="card shadow mb-4">
            <div className="card-body" style={{ padding: "3rem" }}>
              <h2 className="text-center mb-4">Security Skills & Assessment</h2>

              <div className="row g-4 justify-content-center">

                {/* Password Evaluator */}
                <div className="col-10 col-md-5">
                  <div className="game-card-modern text-center p-4 shadow-sm">
                    <h4 className="fw-bold mb-2">Password Evaluator</h4>
                    <p className="text-light">See how secure your password really is.</p>

                    <button
                      className="btn get-started-btn mt-3 fixed-btn"
                      onClick={() => (window.location.href = "/game")}
                    >
                      Get Started →
                    </button>
                  </div>
                </div>

                {/* Knowledge Quiz */}
                <div className="col-10 col-md-5">
                  <div className="game-card-modern text-center p-4 shadow-sm">
                    <h4 className="fw-bold mb-2">Knowledge Quiz</h4>
                    <p className="text-light">Test your cybersecurity knowledge.</p>

                    <button
                      className="btn get-started-btn mt-3 fixed-btn"
                      onClick={() => (window.location.href = "/quiz")}
                    >
                      Get Started →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* LEADERBOARD RIGHT COLUMN */}
        <div className="col-12 col-lg-4">
          <div className="card shadow p-3 mb-4">
            <h2 className="text-center mb-3">Leaderboard</h2>

            <table className="table table-striped table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>XP</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{player.username}</td>
                    <td>{player.xp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

