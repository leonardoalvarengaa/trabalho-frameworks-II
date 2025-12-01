import React, { useEffect, useState } from 'react'
import api from '../api'
import Loading from '../components/Loading'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card, CardContent, Typography, Grid, Button, Box
} from '@mui/material'

export default function Home(){
  const [vagas, setVagas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/vagas')
      .then(res => setVagas(res.data))
      .catch(err => setError(err.message || 'Erro ao carregar vagas'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Vagas</Typography>
      <Grid container spacing={2}>
        {vagas.length === 0 && (
          <Grid item xs={12}>
            <Typography>Nenhuma vaga encontrada.</Typography>
          </Grid>
        )}
        {vagas.map(v => (
          <Grid item xs={12} key={v.id}>
            <Card>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">{v.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{v.empresa} • {v.cidade} • {v.tipo}</Typography>
                </Box>
                <Button variant="outlined" component={RouterLink} to={`/vagas/${v.id}`}>Ver</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
