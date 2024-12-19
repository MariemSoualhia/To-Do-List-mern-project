import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getTaskStats } from "../services/api";
import "./dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getTaskStats(token);
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Typography align="center" className="dashboard-subtitle">
        Welcome to your dashboard! Here's an overview of your tasks.
      </Typography>

      {/* Dynamic Statistic Cards */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card total-tasks">
            <CardContent className="dashboard-card-content">
              <AssignmentIcon fontSize="large" className="icon-primary" />
              <Box>
                <Typography variant="h6">Total Tasks</Typography>
                <Typography variant="h4">{stats.totalTasks}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card completed-tasks">
            <CardContent className="dashboard-card-content">
              <TaskAltIcon fontSize="large" className="icon-success" />
              <Box>
                <Typography variant="h6">Completed Tasks</Typography>
                <Typography variant="h4">{stats.completedTasks}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card pending-tasks">
            <CardContent className="dashboard-card-content">
              <PendingActionsIcon fontSize="large" className="icon-warning" />
              <Box>
                <Typography variant="h6">Pending Tasks</Typography>
                <Typography variant="h4">{stats.pendingTasks}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
