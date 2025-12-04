import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function EditVagaDialog({ open, vaga, onClose, onSave }) {
  const [form, setForm] = useState({
    titulo: "", empresa: "", cidade: "", tipo: "", descricao: "", salario: ""
  });

  useEffect(() => {
    if (vaga) {
      setForm({
        titulo: vaga.titulo || "",
        empresa: vaga.empresa || "",
        cidade: vaga.cidade || "",
        tipo: vaga.tipo || "",
        descricao: vaga.descricao || "",
        salario: vaga.salario ?? ""
      });
    } else {
      setForm({ titulo: "", empresa: "", cidade: "", tipo: "", descricao: "", salario: "" });
    }
  }, [vaga]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, salario: form.salario ? Number(form.salario) : null };
    onSave(payload);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar vaga</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Título" name="titulo" fullWidth value={form.titulo} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Empresa" name="empresa" fullWidth value={form.empresa} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Cidade" name="cidade" fullWidth value={form.cidade} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Tipo" name="tipo" fullWidth value={form.tipo} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Salário" name="salario" fullWidth value={form.salario} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descrição" name="descricao" fullWidth multiline rows={4} value={form.descricao} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
