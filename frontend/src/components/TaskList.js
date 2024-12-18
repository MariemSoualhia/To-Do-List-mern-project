import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  changeStatus,
} from "../services/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add or update a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateTask(editingTask._id, newTask, token);
      } else {
        await createTask(newTask, token);
      }
      setNewTask({ title: "", description: "" });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error creating/updating task:", err);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Change task status
  const handleStatusChange = async (id) => {
    try {
      await changeStatus(id, token);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error("Error changing task status:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "10px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Liste des Tâches
        </Typography>

        {/* Task Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Titre"
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {editingTask ? "Modifier" : "Ajouter"}
          </Button>
        </Box>

        {/* Task List */}
        <List>
          {tasks.map((task) => (
            <React.Fragment key={task._id}>
              <ListItem>
                <ListItemText
                  primary={
                    task.status === "done" ? `✅ ${task.title}` : task.title
                  }
                  secondary={task.description}
                />
                <IconButton onClick={() => handleStatusChange(task._id)}>
                  <CheckCircleIcon
                    color={task.status === "done" ? "success" : "action"}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditingTask(task);
                    setNewTask({
                      title: task.title,
                      description: task.description,
                    });
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(task._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default TaskList;
