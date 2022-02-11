const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Media = require("../models/Media");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", async (req, res) => {
  try {
    const images = await Media.find();
    res.status(200).json({ images: images });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/single", checkAuth, upload.single("image"), async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.headers.host}/uploads/`;
    const file = await new Media({
      url: baseUrl + req.file.filename,
      filename: req.file.filename,
    }).save();
    res.status(201).json(file);
  } catch (err) {
    res.status(409).json(err);
  }
});

router.delete("/:id/:filename", checkAuth, async (req, res) => {
  try {
    await Media.deleteOne({ _id: req.params.id });
    res.status(201).json({ success: true, msg: "Image deleted successfully" });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.use("/", express.static("uploads"));

module.exports = router;
