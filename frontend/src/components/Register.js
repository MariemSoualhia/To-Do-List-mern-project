import React, { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/");
    } catch (err) {
      console.error("Erreur d'inscription", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "10px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom"
            name="name"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            type="submit"
          >
            S'inscrire
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
          Déjà un compte ?{" "}
          <Link to="/" style={{ color: "#3f51b5", textDecoration: "none" }}>
            Connectez-vous ici
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
