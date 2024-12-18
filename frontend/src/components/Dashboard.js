import React from "react";
import { Typography, Box } from "@mui/material";

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>
      <Typography>
        Bienvenue sur le tableau de bord ! Ici, tu peux voir un aperçu général.
      </Typography>
    </Box>
  );
}

export default Dashboard;
