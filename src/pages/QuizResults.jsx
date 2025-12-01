"use client"

export default function QuizResults({ stats, onRetry }) {
  const accuracy =
    stats.correct + stats.wrong > 0 ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100) : 0

  const getResultMessage = (accuracy) => {
    if (accuracy === 100) return "Perfect! You're a security master! 👑"
    if (accuracy >= 80) return "Excellent! Great security knowledge! 🌟"
    if (accuracy >= 60) return "Good job! Keep improving! 💪"
    if (accuracy >= 40) return "Not bad! Practice more! 📚"
    return "Keep learning! You'll get there! 🚀"
  }

  return (
    <div className="results-wrapper">
      <div className="results-card">
        <div className="results-header">
          <h1 className="results-title">Quiz Complete!</h1>
          <p className="results-message">{getResultMessage(accuracy)}</p>
        </div>

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
