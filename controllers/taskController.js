const Task = require("../models/Task");

// Creation TASK
exports.createTask = async (req, res) => {
  try {
    // na3mloo task jdid b données jeya ml body
    const task = await Task.create({
      titre: req.body.titre,
      description: req.body.description,
      statut: req.body.statut,
      deadline: req.body.deadline,
      projet: req.body.projet,  //lezm ykon marboot b projet
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// na3mloo récupérationn les tasks lkoll b filtrages
exports.getTasks = async (req, res) => {
  try {
    const { statut, sort } = req.query;

    let filter = {};

    // si user 7at statut -> nfiltrow alih
    if (statut) filter.statut = statut;

    let query = Task.find(filter);

    // tri selon createdAt ou deadline
    if (sort) query = query.sort(sort);

    // populate -> nraj3ou les infos mtaa projet w user assigné
    const tasks = await query.populate("projet").populate("assignedTo", "nom");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// na3mll récupere l task wa7ed spécifique
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

// na3mlooo modification
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

// najmoo na3mloo supprime l task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//assign task selo manager
exports.assignTask = async (req, res) => {
  try {
    // nbaddlou user assigné ll task (ken manager)
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
