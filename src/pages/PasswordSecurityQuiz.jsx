"use client"

import { useState } from "react"
import QuizSetup from "./QuizSetup"
import QuizGame from "./QuizGame"
import QuizResults from "./QuizResults"
import "../pages/styles/quiz.css"

export default function PasswordSecurityQuiz() {
  const [gameState, setGameState] = useState("setup") // setup, playing, results
  const [quizData, setQuizData] = useState(null)
  const [userStats, setUserStats] = useState({
    xp: 0,
    correct: 0,
    wrong: 0,
    totalXp: 0,
  })

  const handleStartQuiz = async (expertise, numQuestions) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "password security",
          expertise,
          number: numQuestions,
          style: "normal",
        }),
      })

      if (!res.ok) throw new Error("Failed to generate quiz")
      const data = await res.json()

      setQuizData({
        expertise,
        questions: data.questions,
        numQuestions,
      })
      setGameState("playing")
    } catch (err) {
      console.error(err)
      alert("Error generating quiz")
    }
  }

  const handleFinishQuiz = (stats) => {
    setUserStats(stats)
    setGameState("results")
  }

  const handleRetry = () => {
    setGameState("setup")
    setQuizData(null)
  }

  return (
    <div className="quiz-container">
      {gameState === "setup" && <QuizSetup onStartQuiz={handleStartQuiz} />}
      {gameState === "playing" && <QuizGame quizData={quizData} onFinish={handleFinishQuiz} />}
      {gameState === "results" && <QuizResults stats={userStats} onRetry={handleRetry} />}
    </div>
  )
}
