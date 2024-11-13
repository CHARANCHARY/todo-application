const express = require("express");
const db = require("./db");
require("dotenv").config();
const todoRouter = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/todos", todoRouter);

// deployement ----

// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
