import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from "../services/api";
import Loading from '../components/Loading'
import { Paper, Typography, Box, Button } from '@mui/material'

export default function VagaDetails(){
  const { id } = useParams()
  const [vaga, setVaga] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.get(`/vagas/${id}`)
      .then(res => setVaga(res.data))
      .catch(err => setError(err.response?.status === 404 ? 'Vaga não encontrada' : err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <Loading />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>{vaga.nome}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{vaga.empresa} • {vaga.cidade} • {vaga.tipo}</Typography>
      <Box sx={{ mt:2 }}>
        <Typography variant="body1">{vaga.descricao}</Typography>
        {vaga.salario != null && <Typography sx={{ mt:2 }}><strong>Salário:</strong> R$ {vaga.salario}</Typography>}
      </Box>
      <Box sx={{ mt:3 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Voltar</Button>
      </Box>
    </Paper>
  )
}
