import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#3f51b5",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" className="sidebar-title">
            My Application
          </Typography>
        </Toolbar>
        <Divider className="sidebar-divider" />
        <List>
          <ListItem button component={Link} to="/app/dashboard">
            <ListItemIcon>
              <DashboardIcon className="sidebar-icon" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/app/tasks">
            <ListItemIcon>
              <ListIcon className="sidebar-icon" />
            </ListItemIcon>
            <ListItemText primary="Task List" />
          </ListItem>
          <ListItem button component={Link} to="/app/tasksList">
            <ListItemIcon>
              <ListIcon className="sidebar-icon" />
            </ListItemIcon>
            <ListItemText primary="Drag and Drop Tasks" />
          </ListItem>
          <ListItem button component={Link} to="/app/profile">
            <ListItemIcon>
              <AccountCircleIcon className="sidebar-icon" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider className="sidebar-divider" />
        <Box
          sx={{
            textAlign: "center",
            marginTop: "auto",
            paddingBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
