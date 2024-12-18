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
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Mon Application
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button component={Link} to="/app/dashboard">
            <ListItemIcon>
              <DashboardIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/app/tasks">
            <ListItemIcon>
              <ListIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Liste des Tâches" />
          </ListItem>

          <ListItem button component={Link} to="/app/tasksList">
            <ListItemIcon>
              <ListIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Liste des Tâches drag and drop" />
          </ListItem>
          <ListItem button component={Link} to="/app/profile">
            <ListItemIcon>
              <AccountCircleIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItem>
        </List>
        <Divider />
        <Box
          sx={{ textAlign: "center", marginTop: "auto", paddingBottom: "1rem" }}
        >
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Déconnexion
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
