const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Page = require("../models/Page");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pages = await Page.find({});
    res.status(200).json({ pages: pages });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/", checkAuth, (req, res) => {
  new Page({ title: req.body.title, content: req.body.content })
    .save()
    .then(() => {
      res.status(201).json({ success: true, msg: "Page added successfully" });
    })
    .catch((err) => {
      res.json({ success: false, msg: err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const page = await Page.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, page: page });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const page = await Page.deleteOne({ _id: req.params.id });
    res.status(201).json({ success: true, msg: "Page deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, msg: err });
  }
});

module.exports = router;
