import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NewVaga() {
  const [form, setForm] = useState({ titulo: "", empresa: "", cidade: "", tipo: "", descricao: "", salario: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, salario: form.salario ? Number(form.salario) : null };
      await api.post("/vagas", payload);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar vaga");
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" mb={2}>Criar nova vaga</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField label="Título" name="titulo" value={form.titulo} onChange={handleChange} required />
        <TextField label="Empresa" name="empresa" value={form.empresa} onChange={handleChange} />
        <TextField label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} />
        <TextField label="Tipo" name="tipo" value={form.tipo} onChange={handleChange} />
        <TextField label="Descrição" name="descricao" value={form.descricao} onChange={handleChange} multiline rows={4} />
        <TextField label="Salário" name="salario" value={form.salario} onChange={handleChange} />
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate("/")}>Cancelar</Button>
          <Button variant="contained" type="submit">Criar</Button>
        </Box>
      </Box>
    </Container>
  );
}
