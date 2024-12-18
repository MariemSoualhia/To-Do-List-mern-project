import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getTasks, updateTaskStatus } from "../services/api";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

function DragAndDropTasks() {
  const [tasksTodo, setTasksTodo] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks(token);
        setTasksTodo(data.filter((task) => task.status === "todo"));
        setTasksDone(data.filter((task) => task.status === "done"));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // Handle task status update
  const handleTaskMove = async (list, setList, newStatus) => {
    for (let task of list) {
      if (task.status !== newStatus) {
        task.status = newStatus;
        await updateTaskStatus(task._id, newStatus, token);
      }
    }
    setList([...list]);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Gestion des Tâches - Drag and Drop
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            {/* To-Do List */}
            <Paper sx={{ padding: "1rem", width: "45%", minHeight: "300px" }}>
              <Typography variant="h5" align="center">
                À Faire
              </Typography>
              <ReactSortable
                list={tasksTodo}
                setList={(newList) =>
                  handleTaskMove(newList, setTasksTodo, "todo")
                }
                group="tasks"
                animation={150}
                ghostClass="sortable-ghost"
              >
                {tasksTodo.map((task) => (
                  <Box
                    key={task._id}
                    sx={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography>{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </Box>
                ))}
              </ReactSortable>
            </Paper>

            {/* Done List */}
            <Paper sx={{ padding: "1rem", width: "45%", minHeight: "300px" }}>
              <Typography variant="h5" align="center">
                Terminées
              </Typography>
              <ReactSortable
                list={tasksDone}
                setList={(newList) =>
                  handleTaskMove(newList, setTasksDone, "done")
                }
                group="tasks"
                animation={150}
                ghostClass="sortable-ghost"
              >
                {tasksDone.map((task) => (
                  <Box
                    key={task._id}
                    sx={{
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      backgroundColor: "#e0ffe0",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography>{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </Box>
                ))}
              </ReactSortable>
            </Paper>
          </Box>
        </>
      )}
    </Container>
  );
}

export default DragAndDropTasks;
