const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
// route register : tjib data men user w t3aytt controller bch taamel inscription
router.post("/register", register);
// route login : tsir vérification de login + password w taawed tab3ath JWT token
router.post("/login", login);

module.exports = router;
