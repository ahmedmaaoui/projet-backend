const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      titre: req.body.titre,
      description: req.body.description,
      statut: req.body.statut,
      deadline: req.body.deadline,
      projet: req.body.projet,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TASKS (with filters)
exports.getTasks = async (req, res) => {
  try {
    const { statut, sort } = req.query;

    let filter = {};
    if (statut) filter.statut = statut; // filter by status

    let query = Task.find(filter);

    if (sort) query = query.sort(sort); // sort by deadline or createdAt

    const tasks = await query.populate("projet").populate("assignedTo", "nom");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE TASK
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("projet")
      .populate("assignedTo", "nom");

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGN TASK (MANAGER ONLY)
exports.assignTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.body.userId },
      { new: true }
    ).populate("assignedTo", "nom");

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
