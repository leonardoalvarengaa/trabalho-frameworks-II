import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import {
  Box, TextField, Button, Typography, MenuItem, Paper
} from '@mui/material'

export default function NewVaga(){
  const [form, setForm] = useState({
    nome: '', empresa: '', cidade: '', tipo: '', descricao: '', salario: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const tipos = ['CLT', 'Estágio', 'PJ']

  function handleChange(e){
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { ...form, salario: form.salario ? Number(form.salario) : null }
      const res = await api.post('/vagas', payload)
      // after creating, redirect to detail
      navigate(`/vagas/${res.data.id}`)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao criar vaga')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Nova Vaga</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField name="nome" label="Nome da vaga" required value={form.nome} onChange={handleChange} />
        <TextField name="empresa" label="Empresa" required value={form.empresa} onChange={handleChange} />
        <TextField name="cidade" label="Cidade" required value={form.cidade} onChange={handleChange} />
        <TextField select name="tipo" label="Tipo" required value={form.tipo} onChange={handleChange}>
          {tipos.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField name="descricao" label="Descrição" multiline rows={4} value={form.descricao} onChange={handleChange} />
        <TextField name="salario" label="Salário (opcional)" type="number" value={form.salario} onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>Cancelar</Button>
        </Box>
      </Box>
    </Paper>
  )
}
