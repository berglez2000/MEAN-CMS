const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const checkAuth = require("../middleware/check-auth");
const saltRounds = 10;
const secretKey =
  "Tai vanhakin lypsaisi tuo jostakin. Hartioilla en se ei mennessaan ai pysahtyvan sisimpansa vastapaata. Loydetty et kerralla poydalla jo kirkolla antaapas. Pannaan konsuli puskisi te ehdotan en on. Uteliaina annettava tyrskahti he ja. Vieraankin minullekin kerrallaan en et suurtakaan kaupunkien on on. He penkille kurkkuun vierasta takaisin on.";

router.post("/register", checkAuth, (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return res.json(err);
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.json(err);
      const newUser = new User({ username: req.body.username, password: hash });
      newUser
        .save()
        .then(() => {
          res
            .status(201)
            .json({ success: true, msg: "User successfully added" });
        })
        .catch((err) => {
          res.json({ success: false, msg: err });
        });
    });
  });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    bcrypt
      .compare(req.body.password, user.password)
      .then((isMatch) => {
        if (!isMatch)
          return res
            .status(403)
            .json({ success: false, msg: "Passwords dont match" });
        const token = jwt.sign(
          { username: user.username, userID: user._id },
          secretKey,
          { expiresIn: "1h" }
        );

        return res
          .status(200)
          .json({ success: true, msg: "Login successful", jwt: token });
      })
      .catch((err) => {
        res.json({ success: false, msg: err });
      });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = router;
