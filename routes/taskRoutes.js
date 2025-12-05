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
router.post("/", auth, createTask);

// GET all + filters
router.get("/", auth, getTasks);

// GET one
router.get("/:id", auth, getTask);

// UPDATE
router.put("/:id", auth, updateTask);

// DELETE
router.delete("/:id", auth, deleteTask);

// ASSIGN TASK (ONLY MANAGER)
router.put("/:id/assign", auth, manager, assignTask);

module.exports = router;
