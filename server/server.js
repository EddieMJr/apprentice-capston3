import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

/*
   ALLOW FRONTEND CONNECTIONS
*/
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://lrnr-1.onrender.com",
  /^https:\/\/preview-.*\.vusercontent\.net$/,
]

app.use((req, res, next) => {
  console.log("🌍 Request from:", req.headers.origin)
  next()
})

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => (typeof o === "string" ? o === origin : o.test(origin)))) {
        return callback(null, true)
      }
      return callback(new Error("Not allowed by CORS"))
    },
    methods: ["GET", "POST"],
    credentials: true,
  }),
)

app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.post("/api/generate-quiz", async (req, res) => {
  const { difficulty, number } = req.body

  const expertiseMap = {
    novice: "beginner",
    intermediate: "intermediate",
    expert: "advanced",
  }

  const expertise = expertiseMap[difficulty?.toLowerCase()] || "beginner"
  const questionCount = number || 5

  try {
    const prompt = `
You are a professional password security quiz generator.
Create exactly ${questionCount} distinct quiz questions about password security for a ${expertise} level learner.

Focus areas based on difficulty:
- Beginner: Basic concepts like password length, character types, common mistakes
- Intermediate: Best practices, password managers, two-factor authentication, security risks
- Advanced: Advanced threats like rainbow tables, brute force attacks, encryption, security architecture

VERY IMPORTANT RULES:
- Only return numbered questions in this exact format:
1. Question one?
2. Question two?
3. ...
- Do NOT include any introductions, titles, explanations, or text before question 1.
- Do NOT include answers or hints.
Only output the numbered questions, nothing else.
`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    })

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    if (!text) throw new Error("No valid text returned from Gemini")

    const cleanedText = text.replace(/^.*?(?=\n?1\.)/, "").trim()

    const questions = cleanedText
      .split(/\n\d+\.\s*/)
      .filter((q) => q.trim() !== "")
      .map((q) => q.trim())

    res.json({ questions })
  } catch (error) {
    console.error("❌ Quiz generation error:", error)
    res.status(500).json({ error: "Failed to generate quiz." })
  }
})

app.post("/api/evaluate-answer", async (req, res) => {
  const { question, userAnswer } = req.body

  try {
    const evaluationPrompt = `
You are a professional password security quiz evaluator.

Question: "${question}"
User's Answer: "${userAnswer}"

Evaluate if the user's answer is correct for this password security question.
Consider:
- Factual accuracy about password security best practices
- Understanding of security concepts
- Reasonable variations in wording are acceptable

Respond **only** in valid JSON:
{
  "isCorrect": true or false,
  "evaluation": "Correct" or "Incorrect",
  "explanation": "Short reason why (1-2 sentences)"
}
`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: evaluationPrompt }] }],
    })

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ""

    const cleaned = text.replace(/```json|```/g, "").trim()

    let feedback
    try {
      feedback = JSON.parse(cleaned)
    } catch {
      feedback = {
        isCorrect: false,
        evaluation: "Error",
        explanation: "Could not parse AI response properly.",
      }
    }

    res.json(feedback)
  } catch (error) {
    console.error("❌ Evaluation error:", error)
    res.status(500).json({ error: "Failed to evaluate answer." })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Password Security Quiz Server running at http://localhost:${PORT}`)
})
