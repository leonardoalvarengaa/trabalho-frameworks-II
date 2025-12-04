import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import api from "../services/api";
import VagaCard from "../components/VagaCard";
import EditVagaDialog from "../components/EditVagaDialog";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/vagas");
      setVagas(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar vagas", err);
      alert("Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleEditClick(vaga) {
    setEditing(vaga);
    setModalOpen(true);
  }

  async function handleSave(updated) {
    try {
      if (!editing) return;
      await api.put(`/vagas/${editing.id}`, updated);
      setModalOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar vaga");
    }
  }

  async function handleDelete(vaga) {
    const ok = window.confirm(`Excluir vaga "${vaga.titulo}"?`);
    if (!ok) return;
    try {
      await api.delete(`/vagas/${vaga.id}`);
      setVagas(prev => prev.filter(v => v.id !== vaga.id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir vaga");
    }
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Vagas</Typography>
        <Fab color="primary" size="small" onClick={() => navigate("/new")}>
          <AddIcon />
        </Fab>
      </Box>

      {loading ? <Typography>Carregando...</Typography> : (
        vagas.length === 0 ? <Typography>Nenhuma vaga</Typography> :
        vagas.map(v => (
          <VagaCard key={v.id} vaga={v} onEdit={handleEditClick} onDelete={handleDelete} />
        ))
      )}

      <EditVagaDialog open={modalOpen} vaga={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} />
    </Container>
  );
}
