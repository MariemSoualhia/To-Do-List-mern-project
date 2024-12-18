const Task = require("../models/Task");

// Récupérer les tâches
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user.id, title, description });
  res.status(201).json(task);
};

// Modifier une tâche
const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Tâche non trouvée ou non autorisée" });
  }
};

// Supprimer une tâche
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tâche supprimée" });
  } else {
    res.status(404).json({ message: "Tâche non trouvée ou non autorisée" });
  }
};

// Changer le statut d'une tâche
const changeStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    task.status = task.status === "todo" ? "done" : "todo";
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Tâche non trouvée ou non autorisée" });
  }
};
const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  console.log(req.body);
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    task.status = status; // Mise à jour du statut
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Tâche non trouvée ou non autorisée" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  changeStatus,
  updateTaskStatus,
};
