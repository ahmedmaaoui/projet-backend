
const mongoose = require("mongoose");
//lahne bch na3mll schema ll taches 

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: {type :String},
  statut: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
  deadline: Date,
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);

