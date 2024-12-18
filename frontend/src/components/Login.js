import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      navigate("/app/dashboard");
    } catch (err) {
      console.error("Erreur de connexion", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={10} sx={{ padding: "2rem", borderRadius: "10px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Se connecter
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            style={{ color: "#3f51b5", textDecoration: "none" }}
          >
            Inscrivez-vous ici
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
