import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/Dashboard.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    // Fetch all accounts
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts`);
        const data = await res.json();

        if (res.ok) {
          // Example: current logged-in user stored in localStorage
          const currentUser = JSON.parse(localStorage.getItem("user"));
          setUser(currentUser);

          // Sort by XP descending for leaderboard
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
        Welcome, {user.firstName}!
      </h1>

      {/* 2-column layout */}
      <div className="row">
        
        {/* LEFT COLUMN (Stats + Games)*/}
        <div className="col-12 col-lg-8">
          {/* Stats Section */}
          <div className="card shadow mb-4">
            <div className="card-body" style={{ padding: '3rem'}}>
              <h2 className="text-center mb-4">Your Personal Stats</h2>

              <div className="row g-3 justify-content-center">
                <div className="col-10 col-md-5">
                  <div className="card text-white text-center p-3 shadow-sm" style={{ backgroundColor: '#bb7420'}}>
                    <h5 className="mb-1">Total Points</h5>
                    <p className="fw-bold fs-4">{user.xp} xp</p>
                  </div>
                </div>

                <div className="col-10 col-md-5">
                  <div className="card text-white text-center p-3 shadow-sm" style={{ backgroundColor: '#bb7420'}}>
                    <h5 className="mb-1">Total Attempts</h5>
                    <p className="fw-bold fs-4">{user.totalAttempts}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Available Games */}
          <div className="card shadow mb-4">
            <div className="card-body" style={{ padding: '3rem'}}>
              <h2 className="text-center mb-4">Available Games</h2>

              <div className="row g-4 justify-content-center">
                <div className="col-10 col-md-5">
                  <div className="card text-center text-success shadow-sm p-4 bg-dark">
                    <h5 className="fw-bold">Password Cracker</h5>
                    <h8>See how secure your password is!</h8>
                  </div>
                </div>

                <div className="col-10 col-md-5">
                  <div className="card text-center shadow-sm p-4 bg-info">
                    <h5 className="fw-bold">Knowledge Quiz</h5>
                    <h8>Test your Cyber Security Knowledge!</h8>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* LeaderBoard */}
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
