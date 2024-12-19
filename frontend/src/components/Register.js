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
      console.error("Registration error", err);
    }
  };

  return (
    <div className="register-page">
      <Container maxWidth="sm">
        <Paper elevation={10} className="register-form-container">
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
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
              label="Password"
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
              className="submit-button"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center" className="login-link">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Login here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default Register;
