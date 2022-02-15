const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const checkAuth = require("../middleware/check-auth");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ success: false, msg: "Post not found" });
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
    res.status(201).json({ success: true, msg: "Post successfully added" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    post.delete();
    res.json(201).json({ success: true, msg: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, msg: "Post not found" });
  }
});

module.exports = router;
