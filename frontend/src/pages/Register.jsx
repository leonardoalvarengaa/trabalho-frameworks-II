import React, { useState } from "react";
import {
  Avatar, Box, Button, TextField, Typography,
  Paper, CircularProgress, Snackbar, Alert
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { username, password });
      // faz login automático depois do registro
      const res = await api.post("/auth/login", { username, password });
      const token = res?.data?.token ?? res.token ?? res;
      if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common = api.defaults.headers.common || {};
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      setSnack({ open: true, severity: "success", message: "Conta criada! Redirecionando..." });
      setTimeout(() => navigate("/"), 900);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Erro ao registrar. Usuário pode já existir.";
      setSnack({ open: true, severity: "error", message: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg,#f5f7fb,#eef3f8)"
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 420, borderRadius: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5">Criar conta</Typography>
          <Typography variant="body2" color="text.secondary">Informe usuário e senha</Typography>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Usuário"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            helperText="Use pelo menos 4 caracteres"
          />

          <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={22} /> : "Registrar"}
          </Button>

          <Button variant="text" onClick={() => navigate("/login")}>Já tem conta? Entrar</Button>
        </Box>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack(s => ({...s, open:false}))}>
        <Alert onClose={() => setSnack(s => ({...s, open:false}))} severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
