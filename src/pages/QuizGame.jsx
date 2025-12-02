"use client"

import { useState } from "react"

export default function QuizGame({ quizData, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [evaluation, setEvaluation] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [stats, setStats] = useState({
    xp: 0,
    correct: 0,
    wrong: 0,
    totalXp: 0,
  })
  const [submitting, setSubmitting] = useState(false)

  const xpPerQuestion = {
    novice: 10,
    intermediate: 25,
    expert: 50,
  }

  const currentQuestion = quizData.questions[currentIndex]
  const progress = ((currentIndex + 1) / quizData.questions.length) * 100

  const handleSubmit = async () => {
    if (!userAnswer.trim()) {
      alert("Please type an answer first!")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/evaluate-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          userAnswer,
        }),
      })

      const data = await res.json()
      const isCorrect = data.evaluation === "Correct"

      let earnedXp = 0
      if (isCorrect) {
        earnedXp = xpPerQuestion[quizData.expertise]
        setStats((prev) => ({
          ...prev,
          xp: prev.xp + earnedXp,
          totalXp: prev.totalXp + earnedXp,
          correct: prev.correct + 1,
        }))
      } else {
        setStats((prev) => ({
          ...prev,
          wrong: prev.wrong + 1,
        }))
      }

      const formattedFeedback = data.explanation
        ?.replace(/(\.)([A-Z])/g, ".\n$2")
        .replace(/\n+/g, "\n")
        .trim()

      setEvaluation({
        isCorrect,
        result: data.evaluation,
        feedback: formattedFeedback,
        earnedXp,
      })
      setShowEvaluation(true)
    } catch (err) {
      console.error(err)
      setEvaluation({
        isCorrect: false,
        result: "Error",
        feedback: "Error checking answer.",
        earnedXp: 0,
      })
      setShowEvaluation(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < quizData.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer("")
      setShowEvaluation(false)
      setEvaluation(null)
    } else {
      onFinish(stats)
    }
  }

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <div className="header-top">
          <div className="level-badge">{quizData.expertise.toUpperCase()}</div>
          <div className="xp-display">
            <span className="xp-label">XP</span>
            <span className="xp-value">{stats.xp}</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Question {currentIndex + 1} of {quizData.questions.length}
        </div>
      </div>

      <div className="game-content">
        <div className="question-card">
          <h2 className="question-title">Question</h2>
          <p className="question-text">{currentQuestion}</p>
        </div>

        <div className="answer-card">
          <h2 className="answer-title">Your Answer</h2>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !showEvaluation && handleSubmit()}
            placeholder="Type your answer..."
            disabled={showEvaluation}
            className="answer-input"
          />

          {!showEvaluation && (
            <button onClick={handleSubmit} disabled={submitting} className="action-button submit-btn">
              {submitting ? "Checking..." : "Submit Answer"}
            </button>
          )}
        </div>

        {showEvaluation && evaluation && (
          <div className={`evaluation-card ${evaluation.isCorrect ? "correct" : "incorrect"}`}>
            <div className="evaluation-header">
              <span className="evaluation-icon">{evaluation.isCorrect ? "✓" : "✗"}</span>
              <span className="evaluation-text">{evaluation.result}</span>
              {evaluation.earnedXp > 0 && <span className="earned-xp">+{evaluation.earnedXp} XP</span>}
            </div>
            <div className="evaluation-feedback">{evaluation.feedback}</div>
            <button onClick={handleNext} className="action-button next-btn">
              {currentIndex === quizData.questions.length - 1 ? "See Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
