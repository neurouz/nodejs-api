const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Import routes
const authRoute = require("./routes/auth");

dotenv.config();

// Connect do database
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to database"));

// Middleware
app.use(express.json());
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server is up and running"));