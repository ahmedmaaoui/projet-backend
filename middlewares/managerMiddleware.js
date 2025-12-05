module.exports = (req, res, next) => {
  // 3maltt middleware bach verifier role manager
  if (req.user.role !== "manager")
    return res.status(403).json({ msg: "Accès interdit : Manager uniquement" });

  next();
};
