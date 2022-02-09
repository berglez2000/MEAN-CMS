const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const pages = require("./routes/pages");
const users = require("./routes/users");
const media = require("./routes/media");
const path = require("path");

const app = express();

// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/cms-app")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.port || 5000;

// Pages Middleware
app.use("/api/pages", pages);

// Users Middleware
app.use("/api/users", users);

// Media Middleware
app.use("/api/media/", media);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
