import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainPage = ({ setToken }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Welcome to Our Bank App</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: "10px" }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Container>
  );
};

export default MainPage;
