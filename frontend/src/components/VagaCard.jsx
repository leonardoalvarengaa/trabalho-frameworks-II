import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function VagaCard({ vaga, onEdit, onDelete }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6">{vaga.titulo || vaga.nome}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {vaga.empresa} • {vaga.cidade} • {vaga.tipo}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>{vaga.descricao}</Typography>
        </Box>

        <CardActions sx={{ flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
          <Button size="small" variant="outlined" onClick={() => onEdit(vaga)}>Editar</Button>
          <Button size="small" color="error" variant="contained" onClick={() => onDelete(vaga)}>Excluir</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
