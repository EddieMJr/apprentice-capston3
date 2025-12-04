import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"
import db from'./db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
  "https://main.d1ofx20e09tklh.amplifyapp.com",
  "https://capstone-backend-ryte.onrender.com",
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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
)

app.use(express.json())

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Expect: "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Token missing" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" })
    req.user = user // store user info in req.user
    next()
  })
}

app.post("/api/register", async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if username or email already exists
    const [existing] = await db.query(
      "SELECT id FROM accounts WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: "Username or email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      `INSERT INTO accounts (username, email, firstName, lastName, password, xp, totalAttempts)
       VALUES (?, ?, ?, ?, ?, 0, 0)`,
      [username, email, firstName, lastName, hashedPassword]
    );

    console.log("New user registered:", username);

    return res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    return res.status(500).json({ error: "Server error. Try again." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = jwt.sign(
      { id: user.id, username: user.username, firstName: user.firstName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful!", token, user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      xp: user.xp,
      totalAttempts: user.totalAttempts,
  } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT id, username, email, firstName, lastName, xp, totalAttempts, role FROM accounts WHERE role != 'admin' ORDER BY xp DESC`);
    res.json({ accounts: rows });
  } catch (err) {
    console.error("❌ Failed to fetch accounts:", err);
    res.status(500).json({ error: "Failed to fetch accounts." });
  }
});

app.post("/api/update-stats", authenticateToken, async (req, res) => {
  const { xpToAdd } = req.body;

  if (typeof xpToAdd !== "number") {
    return res.status(400).json({ error: "xpToAdd is required and must be a number." });
  }

  try {
    const [result] = await db.query(
      `UPDATE accounts 
       SET xp = xp + ?, totalAttempts = totalAttempts + 1 
       WHERE id = ?`,
      [xpToAdd, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const [updatedRows] = await db.query(
      "SELECT id, username, email, firstName, lastName, xp, totalAttempts, role FROM accounts WHERE id = ?",
      [req.user.id]
    );

    return res.json({ 
      message: "Stats updated successfully!", 
      user: updatedRows[0] 
    });

  } catch (err) {
    console.error("❌ Update stats error:", err);
    res.status(500).json({ error: "Server error. Could not update stats." });
  }
});


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.post("/api/generate-quiz", async (req, res) => {
  const { difficulty, number } = req.body;


  const diff = (difficulty || "").toLowerCase().trim();
  const expertiseMap = {
    novice: "beginner",
    intermediate: "intermediate",
    expert: "advanced",
  };

  const expertise = expertiseMap[diff];
  const questionCount = number || 5;

  try {
    const prompt = `
You are an expert password security quiz generator.

Generate EXACTLY ${questionCount} UNIQUE open-ended questions
for a **${expertise}-level** learner.

STRICT RULES:
- OUTPUT MUST START WITH "1." AS THE FIRST CHARACTER
- FORMAT MUST BE:
1. Question?
2. Question?
3. Question?
- NO INTRODUCTION, NO TITLES, NO EXPLANATIONS
- NO ANSWERS
- NO OPTIONS (because these are open-ended questions)
- DO NOT REPEAT QUESTIONS
- DO NOT ADD ANY TEXT BEFORE OR AFTER THE NUMBERED QUESTIONS

Focus areas based on difficulty: 
- Beginner: Basic concepts like password length, character types, common mistakes. 
- Intermediate: Best practices, password managers, two-factor authentication, security risks.
- Advanced: Advanced threats like rainbow tables, brute force attacks, encryption, security architecture.

If you add anything before "1." the output is INVALID.
If you repeat a question, the output is INVALID.

Output ONLY the numbered questions and NOTHING else.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.trim();

    // FIX: ensure text starts at question 1
    const startIndex = text.indexOf("1.");
    if (startIndex > 0) {
      text = text.substring(startIndex);
    }

    // FIX: split and clean questions
    const questions = text
      .split(/\n\d+\.\s+/)
      .filter((q, i) => q.trim() !== "" && i > 0) // remove empty first element
      .map((q) => q.trim());

    if (questions.length === 0) {
      throw new Error("AI returned invalid output");
    }

    res.json({ questions });

  } catch (error) {
    console.error("❌ Quiz generation error:", error);
    res.status(500).json({ error: "Failed to generate quiz." });
  }
});

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
- The user's answer should be based on factual information, not personal opinion or assumptions (e.g., "I don't know" is not acceptable).

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

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: admin only." });
  }
  next();
}

app.get("/api/accounts", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, username, email, firstName, lastName, xp, totalAttempts, role 
       FROM accounts`
    );

    res.json({ accounts: rows });

  } catch (err) {
    console.error("❌ Failed to fetch accounts:", err);
    res.status(500).json({ error: "Failed to fetch accounts." });
  }
});

app.delete("/api/accounts/:id", authenticateToken, requireAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    // Prevents admin from deleting themselves
    if (parseInt(userId) === req.user.id) {
      return res.status(400).json({ error: "Admins cannot delete their own account." });
    }

    const [result] = await db.query("DELETE FROM accounts WHERE id = ?", [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });

  } catch (err) {
    console.error("❌ Delete user error:", err);
    res.status(500).json({ error: "Server error deleting user." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Password Security Quiz Server running at http://localhost:${PORT}`)
})
