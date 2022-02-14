const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);
