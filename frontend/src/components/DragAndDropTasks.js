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
import "./draganddrop.css";

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
    <Container maxWidth="md" className="task-container">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Task Management - Drag and Drop
          </Typography>

          <Box className="task-box">
            {/* To-Do List */}
            <Paper className="task-paper todo">
              <Typography variant="h5" align="center" className="task-header">
                To Do
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
                  <Box key={task._id} className="task-item">
                    <Typography className="task-title">{task.title}</Typography>
                    <Typography className="task-desc">
                      {task.description}
                    </Typography>
                  </Box>
                ))}
              </ReactSortable>
            </Paper>

            {/* Done List */}
            <Paper className="task-paper done">
              <Typography variant="h5" align="center" className="task-header">
                Done
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
                  <Box key={task._id} className="task-item done-item">
                    <Typography className="task-title">{task.title}</Typography>
                    <Typography className="task-desc">
                      {task.description}
                    </Typography>
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
