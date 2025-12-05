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

const auth = require("../middlewares/authMiddleware");
const manager = require("../middlewares/managerMiddleware");

// CREATE
router.post("/", auth, createTask); //bch nasna3 tache

// GET all + filters
router.get("/", auth, getTasks); //bch namll récupérationn ll taches lkoll

// GET one
router.get("/:id", auth, getTask); //bch na3mll récupération ll tache spécifique

// UPDATE
router.put("/:id", auth, updateTask);// bch na3ml modificationn ll taches

// DELETE
router.delete("/:id", auth, deleteTask); //bch nsupprimie tache

// ASSIGN TASK (ONLY MANAGER)
router.put("/:id/assign", auth, manager, assignTask); //lahne assign tache manager

module.exports = router;
