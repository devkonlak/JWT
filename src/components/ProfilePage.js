import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); 
      if (token) {
        try {
          const response = await axios.get("http://localhost:3001/profile", {
            headers: {
              Authorization: token, 
            },
          });
          setUsername(response.data.split(" ")[1]); 
        } catch (err) {
          console.error(err);
          navigate("/login");
        }
      } else {
        navigate("/login"); 
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">Welcome, {username}!</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
