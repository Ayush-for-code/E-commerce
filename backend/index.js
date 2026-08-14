const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const connectToMongo = require("./db");
const { clerkMiddleware } = require("@clerk/express");
console.log(
  "CLERK SECRET:",
  process.env.CLERK_SECRET_KEY ? "LOADED" : "NOT LOADED"
);

// =============================
// Connect MongoDB
// =============================
connectToMongo();

const app = express();
const PORT = process.env.PORT || 3000;

// =============================
// Enable CORS
// Allows frontend to access backend
// =============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// =============================
// Clerk Webhook
// IMPORTANT:
// Clerk sends a RAW request body.
// express.json() must NOT run before this.
// =============================
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/clerk")
);

// =============================
// Parse JSON for all normal API requests
// =============================
app.use(express.json());

// =============================
// Clerk Middleware
// Adds authentication information to req.auth
// Example:
// req.auth.userId
// req.auth.sessionId
// =============================
app.use(clerkMiddleware());

// =============================
// API Routes
// =============================
app.use("/api/auth", require("./routes/auth")); // Old JWT auth (remove later if migrating fully)
app.use("/api/cart", require("./routes/cart"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/order", require("./routes/order"));
app.use("/api/address", require("./routes/addressRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api", require("./routes/filter"));
app.use("/api/user", require("./routes/user"));

// =============================
// Static Upload Folder
// =============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =============================
// Health Check Route
// =============================
app.get("/", (req, res) => {
  res.send("✅ Backend server is running...");
});

// =============================
// Start Server
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});