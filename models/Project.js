
const mongoose = require("mongoose");
//lahne 3mll schema ll projet 7atit fih (nom ,description,owenr l 3indo projet , ...)
const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  statut: { type: String, default: "en cours" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
