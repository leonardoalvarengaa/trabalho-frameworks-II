import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewVaga from './pages/NewVaga'
import VagaDetails from './pages/VagaDetails'

export default function App(){
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vagas/new" element={<NewVaga />} />
          <Route path="/vagas/:id" element={<VagaDetails />} />
        </Routes>
      </Container>
    </>
  )
}
