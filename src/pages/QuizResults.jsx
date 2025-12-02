"use client"

import { useState, useEffect, useRef } from "react"

export default function QuizResults({ stats, onRetry }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const accuracy =
    stats.correct + stats.wrong > 0 ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100) : 0
  
  const getResultMessage = (accuracy) => {
    if (accuracy === 100) return "Perfect! You're a security master! 👑"
    if (accuracy >= 80) return "Excellent! Great security knowledge! 🌟"
    if (accuracy >= 60) return "Good job! Keep improving! 💪"
    if (accuracy >= 40) return "Not bad! Practice more! 📚"
    return "Keep learning! You'll get there! 🚀"
  }

   const hasUpdated = useRef(false)
   useEffect(() => {
    if (hasUpdated.current) return
    hasUpdated.current = true
    console.log("➡️ QuizResults mounted with stats:", stats)

    const submitStats = async () => {
      console.log("➡️ Running submitStats()...")

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("❌ No token found")
        setError("User is not logged in")
        setLoading(false)
        return
      }

      try {
        console.log("📡 Sending stats to backend:", {
          xpToAdd: stats.totalXp,
        })

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/update-stats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ xpToAdd: stats.totalXp }),
        })

        const data = await res.json()
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log("📥 Backend responded:", data)

        if (!res.ok) {
          setError(data.error || "Failed to update stats")
        } else {
          setUserStats({
            xp: data.user.xp,
            totalAttempts: data.user.totalAttempts,
          })
        }
      } catch (err) {
        console.error("❌ Failed to update stats:", err)
        setError("Failed to update stats.")
      } finally {
        setLoading(false)
      }
    }

    submitStats()
  }, [])

  return (
    <div className="results-wrapper">
      <div className="results-card">
        <div className="results-header">
          <h1 className="results-title">Quiz Complete!</h1>
          <p className="results-message">{getResultMessage(accuracy)}</p>
        </div>

        {loading && <p>Updating your XP..</p>}
        {error && <p>{error}</p>}

        <div className="stats-grid">
          <div className="stat-box xp-stat">
            <div className="stat-label">Total XP Earned</div>
            <div className="stat-value">{stats.totalXp}</div>
          </div>
          <div className="stat-box accuracy-stat">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">{accuracy}%</div>
          </div>
          <div className="stat-box correct-stat">
            <div className="stat-label">Correct</div>
            <div className="stat-value">{stats.correct}</div>
          </div>
          <div className="stat-box wrong-stat">
            <div className="stat-label">Wrong</div>
            <div className="stat-value">{stats.wrong}</div>
          </div>
        </div>

        <button onClick={onRetry} className="retry-button">
          Try Another Quiz
        </button>
      </div>
    </div>
  )
}
