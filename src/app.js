const express = require("express");
require("dotenv").config(); // to access the environment variables.
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 8200;

// Middleware
app.use(express.json());
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log("Server is running on 8000");
});

module.exports = app;
