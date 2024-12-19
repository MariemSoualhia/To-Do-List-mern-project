import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { getUserProfile } from "../services/api";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await getUserProfile(token);
        setUser(data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération du profil utilisateur",
          err
        );
      }
    };

    fetchUserProfile();
  }, [token]);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
          Chargement des informations utilisateur...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="profile-container">
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <Grid container justifyContent="center" sx={{ marginTop: "2rem" }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card className="profile-card">
            <Box display="flex" justifyContent="center" marginBottom="1rem">
              <Avatar
                alt={user.name}
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2rem",
                  backgroundColor: "#3f51b5",
                }}
              >
                {user.name[0]}
              </Avatar>
            </Box>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Member since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
