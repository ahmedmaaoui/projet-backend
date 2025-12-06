const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
} = require("../controllers/taskController");
// middleware d'authentification
const auth = require("../middlewares/authMiddleware");
// middleware li y5alli ken manager yfassakh wala yassigni
const manager = require("../middlewares/managerMiddleware");


router.post("/", auth, createTask); //bch nasna3 tache


router.get("/", auth, getTasks); //bch namll récupérationn ll taches lkoll


router.get("/:id", auth, getTask); //bch na3mll récupération ll tache spécifique


router.put("/:id", auth, updateTask);// bch na3ml modificationn ll taches


router.delete("/:id", auth, deleteTask); //bch nsupprimie tache


router.put("/:id/assign", auth, manager, assignTask); //lahne assign tache manager

module.exports = router;
