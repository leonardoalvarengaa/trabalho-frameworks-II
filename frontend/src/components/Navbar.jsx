import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', flexGrow: 1 }}>
            Sistema Vagas
          </Typography>
          <Button color="inherit" component={RouterLink} to="/vagas/new">Nova Vaga</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
