const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const checkAuth = require('../middleware/check-auth');

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
    });
    await newPost.save();
    res.status(201).json({ success: true, msg: 'Post successfully added' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
