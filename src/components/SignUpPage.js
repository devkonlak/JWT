import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      await axios.post("http://localhost:3001/signup", { username, password });
      alert("User created successfully. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPage;
