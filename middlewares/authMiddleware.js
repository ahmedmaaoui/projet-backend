const jwt = require("jsonwebtoken");
// lhne 3mlltt middleware bch na3mll protection ll routes
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // bch na9ra token

  if (!authHeader) return res.status(401).json({ msg: "Token manquant" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // na3mll vérification ll token
    req.user = decoded; //  vérifie { id, role } fi req.user
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token invalide" });
  }
};
