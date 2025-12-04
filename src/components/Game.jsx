"use client"

import { useState } from "react"
import "../components/styles/game.css"

export default function PasswordCrackGame() {
  const [password, setPassword] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [terminalText, setTerminalText] = useState([])

  const lowercase = 26
  const uppercase = 26
  const numbers = 10
  const symbols = 32

  function calculateCrackTime(pass) {
    if (!pass) return "Enter a password"

    let pool = 0
    if (/[a-z]/.test(pass)) pool += lowercase
    if (/[A-Z]/.test(pass)) pool += uppercase
    if (/[0-9]/.test(pass)) pool += numbers
    if (/[^a-zA-Z0-9]/.test(pass)) pool += symbols

    const combinations = BigInt(pool) ** BigInt(pass.length)
    const attemptsPerSecond = BigInt(1_000_000_000)
    const seconds = combinations / attemptsPerSecond

    return formatTime(seconds)
  }

  function formatTime(seconds) {
    if (seconds < 1n) return "Less than 1 second 😭"
    if (seconds < 60n) return `${seconds} seconds`
    if (seconds < 3600n) return `${seconds / 60n} minutes`
    if (seconds < 86400n) return `${seconds / 3600n} hours`
    if (seconds < 31536000n) return `${seconds / 86400n} days`

    const years = seconds / 31536000n
    if (years < 100n) return `${years} years`
    if (years < 1_000_000n) return `${years} years (pretty strong!)`
    if (years < 1_000_000_000n) return `${years} years (uncrackable by modern computers)`

    return "Longer than the age of the universe 😭🔥"
  }

  function getStrengthLabel(time) {
    if (!time) return ""
    if (time.includes("Less than 1 second")) return "danger"
    if (time.includes("seconds") || time.includes("minutes")) return "danger"
    if (time.includes("hours") || time.includes("days")) return "warning"
    if (time.includes("years")) return "success"
    return "success"
  }

  function handleCheck() {
    if (!password) return

    const time = calculateCrackTime(password)

    setResult(null)
    setLoading(true)
    setProgress(0)
    setTerminalText([])

    const hackerLines = [
      "[+] Initializing brute force engine...",
      "[+] Loading hash tables...",
      "[+] Compiling attack dictionary...",
      "[+] Starting GPU cluster...",
      "[+] Running 1,000,000,000 attempts/sec...",
      "[+] Cracking password...",
    ]

    // animate terminal text every 300 ms
    hackerLines.forEach((line, i) => {
      setTimeout(() => {
        setTerminalText((prev) => [...prev, line])
      }, i * 300)
    })

    // progress bar logic
    let p = 0
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setLoading(false)
          setResult(time)
        }, 500)
      }
      setProgress(p)
    }, 200)
  }

  return (
    <div className="container-hack">
      <div className="grid-background"></div>

      <div className="hack-card">
        <div className="title-section">
          <h1 className="hack-title">Hacker Password Cracker</h1>
          <p className="subtitle">Test your password strength against modern attacks</p>
        </div>

        {/* Input section  */}
        <div className="input-section">
          <label className="input-label">Enter Password</label>
          <div className="input-wrapper">
            <input
              type="text"
              className="hack-input"
              placeholder="Type a password to hack..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCheck()}
            />
          </div>

          <button className={`hack-button ${loading ? "loading" : ""}`} onClick={handleCheck} disabled={loading}>
            {loading ? "Hacking..." : "Start Hack"}
          </button>
        </div>

        {/* Terminal output */}
        {loading && (
          <div className="terminal-section">
            <div className="terminal-header">
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
              <span className="terminal-dot"></span>
            </div>
            <div className="terminal-content">
              {terminalText.map((line, i) => (
                <div key={i} className="terminal-line">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        {loading && (
          <div className="progress-section">
            <div className="progress-label">
              Hacking progress: <span className="progress-value">{progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
                <div className="progress-bar-shimmer"></div>
              </div>
            </div>
          </div>
        )}

        {/* Result display */}
        {result && !loading && (
          <div className="result-section">
            <div className="result-card">
              <div className="result-icon">⏳</div>
              <div className="result-content">
                <p className="result-label">Crack Time:</p>
                <p className="result-value">{result}</p>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {result && !loading && (
          <div className="suggestions-section">
            <h4 className="suggestions-title">🔧 Suggestions to Improve Your Password</h4>
            <ul className="suggestions-list">
              {!/[A-Z]/.test(password) && <li className="suggestion-item">Add at least one uppercase letter (A–Z)</li>}
              {!/[a-z]/.test(password) && <li className="suggestion-item">Add lowercase letters (a–z)</li>}
              {!/[0-9]/.test(password) && <li className="suggestion-item">Add numbers (0–9)</li>}
              {!/[^a-zA-Z0-9]/.test(password) && <li className="suggestion-item">Add symbols like ! @ # $ % *</li>}
              {password.length < 10 && (
                <li className="suggestion-item">Increase password length to 10–14 characters</li>
              )}
              {password.length < 16 && (
                <li className="suggestion-item">Try using a passphrase: "PurpleTigerEatsSky"</li>
              )}
              {/(.)\1{2,}/.test(password) && (
                <li className="suggestion-item">Avoid repeating characters ("aaa", "111", "!!!")</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
