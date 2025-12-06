const Project = require("../models/Project");

// 3maltt création ll projet
exports.createProject = async (req, res) => {
  try {
    // na3mlo projet jdid, owner houwa li 3mal login (req.user.id)
    const project = await Project.create({
      nom: req.body.nom,
      description: req.body.description,
      statut: req.body.statut,
      owner: req.user.id, // hedhi jeya ml token
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération ll les projets lkoll
exports.getProjects = async (req, res) => {
  try {
    let projects;
    //ken il user manager ychoff les projets lkoll

    if (req.user.role === "manager") {
      projects = await Project.find().populate("owner", "nom");
    } else {
      //ken user normal yal9a ken projet mta3o
      projects = await Project.find({ owner: req.user.id });
    }

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération ll projet spécifique
exports.getProject = async (req, res) => {
  try {
    // nhezzou ID ml params
    const proj = await Project.findById(req.params.id);

    if (!proj) return res.status(404).json({ msg: "Projet non trouvé" });

    res.json(proj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// lhne 3maltt fonction bch najem na3mll modification 3la projet
exports.updateProject = async (req, res) => {
  try {
    // nbaddlou ay champs 3al ID spécifié
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // bch nraj3ou version lupdated
    });

    res.json(proj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// fonction bch najem nsupprime ayy project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
