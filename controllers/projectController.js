const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      nom: req.body.nom,
      description: req.body.description,
      statut: req.body.statut,
      owner: req.user.id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "manager") {
      projects = await Project.find().populate("owner", "nom");
    } else {
      projects = await Project.find({ owner: req.user.id });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE PROJECT
exports.getProject = async (req, res) => {
  try {
    const proj = await Project.findById(req.params.id);

    if (!proj) return res.status(404).json({ msg: "Projet non trouvé" });

    res.json(proj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(proj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
