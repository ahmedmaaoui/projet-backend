const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
// lahné 3mlt import lil fonctions eli bch yébdew yexecutiw el logique (CRUD) mte3 projects
// hedhy hiya l'architecture MVC : Routes → Controllers → DB

const auth = require("../middlewares/authMiddleware");
//  hedhy middleware mte3 auth : ta3mel vérification lil JWT
// ay project route bch ykoun protected (t7eb user connecté bark yaccessiha)

//  Route : GET /api/projects
router.get("/", auth, getProjects);
// tjib liste kol projects mte3 user ili connecté
// auth obligatoire bch ma yéchoufhéch projects mta3 7ad

//  Route : GET /api/projects/:id
router.get("/:id", auth, getProject);
// tjib project wa7ed 3la hsab el ID


//  Route : PUT /api/projects/:id
router.put("/:id", auth, updateProject);
//  ta3mel update lil project 
// dima b token bch n7emou data mte3 user

// Route : DELETE /api/projects/:id
router.delete("/:id", auth, deleteProject);
// tfasa5 project mte3 user
// dima n7ott el auth bch ki yji user yfasakh project moch mte3ou yetblocked
module.exports = router; //lahné nasaddrou router bch najmou nist3mlo fil server.js
