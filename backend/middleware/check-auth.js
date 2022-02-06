const jwt = require("jsonwebtoken");
const secretKey =
  "Tai vanhakin lypsaisi tuo jostakin. Hartioilla en se ei mennessaan ai pysahtyvan sisimpansa vastapaata. Loydetty et kerralla poydalla jo kirkolla antaapas. Pannaan konsuli puskisi te ehdotan en on. Uteliaina annettava tyrskahti he ja. Vieraankin minullekin kerrallaan en et suurtakaan kaupunkien on on. He penkille kurkkuun vierasta takaisin on.";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};
