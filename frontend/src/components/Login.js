import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import "../styles.css";

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
      console.error("Login error", err);
    }
  };

  return (
    <div className="login-page">
      <Container maxWidth="sm">
        <Paper elevation={10} className="login-form-container">
          <Typography variant="h4" align="center" gutterBottom>
            Login
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
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" className="register-link">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Sign up here
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
