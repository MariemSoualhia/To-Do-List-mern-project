const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user.id, title, description });
  res.status(201).json(task);
};

module.exports = { getTasks, createTask };
