"use client"

import { useState } from "react"

export default function QuizSetup({ onStartQuiz }) {
  const [expertise, setExpertise] = useState("")
  const [numQuestions, setNumQuestions] = useState("5")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!expertise) {
      alert("Please select expertise level")
      return
    }
    setLoading(true)
    onStartQuiz(expertise, numQuestions)
  }

  return (
    <div className="setup-wrapper">
      <div className="setup-card">
        <div className="setup-header">
          <div className="header-icon">🔐</div>
          <h1 className="setup-title">Password Security Quiz</h1>
          <p className="setup-subtitle">Test your knowledge and earn XP to master password security</p>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-group">
            <label className="form-label">Select Your Level</label>
            <div className="expertise-grid">
              {[
                { value: "novice", label: "Novice", icon: "🌱", xp: "10 XP/Q" },
                {
                  value: "intermediate",
                  label: "Intermediate",
                  icon: "⚡",
                  xp: "25 XP/Q",
                },
                {
                  value: "expert",
                  label: "Expert",
                  icon: "👑",
                  xp: "50 XP/Q",
                },
              ].map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setExpertise(level.value)}
                  className={`expertise-button ${expertise === level.value ? "active" : ""}`}
                >
                  <span className="expertise-icon">{level.icon}</span>
                  <span className="expertise-name">{level.label}</span>
                  <span className="expertise-xp">{level.xp}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="numQuestions" className="form-label">
              Number of Questions
            </label>
            <select
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="form-select"
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Starting..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  )
}
