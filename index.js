
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname (not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Serve static files (frontend pages)
app.use(express.static(path.join(__dirname, "public")));

// Fake user storage
const users = [];

// Signup API
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "Signup successful! Please login." });
});

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful!", user: { username } });
});

// Fallback for direct page navigation (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirnam, "signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirnam, "login.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
