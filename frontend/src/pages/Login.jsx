import React, { useState } from "react";
import {
  Avatar, Box, Button, TextField, Typography,
  Paper, CircularProgress, Snackbar, Alert
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, severity: "error", message: "" });
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res?.data?.token ?? res.token ?? res;
      if (!token) throw new Error("Resposta não retornou token.");
      // salva token e atualiza axios
      localStorage.setItem("token", token);
      api.defaults.headers.common = api.defaults.headers.common || {};
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setSnack({ open: true, severity: "success", message: "Login realizado!" });
      // redireciona
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, severity: "error", message: "Usuário ou senha inválidos." });
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
      <Paper elevation={6} sx={{ p: 4, width: 380, borderRadius: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Entrar</Typography>
          <Typography variant="body2" color="text.secondary">Acesse sua conta</Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
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
          />

          <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={22} /> : "Entrar"}
          </Button>

          <Button variant="text" sx={{ mt: 0 }} onClick={() => navigate("/register")}>
            Não tem conta? Criar agora
          </Button>
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
