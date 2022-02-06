const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
