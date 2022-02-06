const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PageSchema = mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Page", PageSchema);
