import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Projeto Vagas
          </Typography>
        </Box>

        <Box>
          {!token ? (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Entrar</Button>
              <Button color="inherit" component={RouterLink} to="/register">Registrar</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/new">Nova Vaga</Button>
              <Button color="inherit" onClick={handleLogout}>Sair</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
