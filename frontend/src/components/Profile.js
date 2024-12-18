import React from "react";
import { Typography, Box } from "@mui/material";

function Profile() {
  const user = { name: "John Doe", email: "john.doe@example.com" };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profil Utilisateur
      </Typography>
      <Typography>Nom : {user.name}</Typography>
      <Typography>Email : {user.email}</Typography>
    </Box>
  );
}

export default Profile;
