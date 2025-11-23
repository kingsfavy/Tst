import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // if you have frontend files

// Fake user storage
const users = [];

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "Signup successful! Please login." });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful!", user: { username } });
});

// Page routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, + "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, + "login.html"));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
