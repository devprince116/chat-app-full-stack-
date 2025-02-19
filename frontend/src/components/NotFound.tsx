import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Page Not Found!</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
      >
        Go to Home
      </Button>
    </div>
  );
};
