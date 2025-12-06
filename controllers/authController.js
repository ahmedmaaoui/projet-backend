const User = require("../models/User");
const bcrypt = require("bcryptjs");
// bcrypt : nasta3mlouha bch ncryptiw password w ma yetkhazench en clair
const jwt = require("jsonwebtoken");
// jsonwebtoken : bch nejmou ncréiw token d'identification
exports.register = async (req, res) => {
  try {
    // njibou les données mta3 l'utilisateur ml body
    const { nom, login, password, role } = req.body;
    // nchoufou ke, fama user 3indo nafss login, bch npreventiw doublons

    const exist = await User.findOne({ login });
    if (exist) return res.status(400).json({ msg: "Login existe déjà" });
    // na3mlou hash mtaa lmot de passe bch mayet7attech raw text fil base

    const hashed = await bcrypt.hash(password, 10);
    //na3mloo user jdid fi base
    const user = await User.create({
      nom,
      login,
      password: hashed,
      role,
    });
    // nraj3ou user fi JSON
    res.json(user);
  } catch (err) {
    // en cas d'erreur nraja3ou erreur serveur
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // njibou login w password ml body
    const { login, password } = req.body;
    // nlawjj 3l  user bil login
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ msg: "Utilisateur introuvable" });
    // ncombariw mot de passe entré w mot de passe crypté fil base
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Mot de passe incorrect" });
    // na3mlou JWT token fih id w role bch nesta3mlouh fi lauth
    const token = jwt.sign(
      { id: user._id, role: user.role }, // données li bch yencoderhom
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token yetfsa5 ba3d 1 jour
    );
    // nraj3ou token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
