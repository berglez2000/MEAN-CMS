const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", (req, res) => {
  res.json({ success: true, msg: "We are on media" });
});

router.post("/single", upload.single("image"), (req, res) => {
  res.status(201).json({ success: true, msg: "Image upload success" });
});

router.use("/", express.static("uploads"));

module.exports = router;
