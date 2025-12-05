module.exports = (req, res, next) => {
  if (req.user.role !== "manager")
    return res.status(403).json({ msg: "Accès interdit : Manager uniquement" });

  next();
};
