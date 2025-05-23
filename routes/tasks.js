const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// POST add new task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({ name: req.body.name });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
});

module.exports = router;
