const mongoose = require("mongoose");
const uniquieValidator = require("mongoose-unique-validator");

const MeidaSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Media", MeidaSchema);
