// src/components/VagaItem.jsx
import React from "react";

export default function VagaItem({ vaga, onEdit, onDelete }) {
  return (
    <div style={{
      border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 8,
      display: "flex", justifyContent: "space-between", alignItems: "center"
    }}>
      <div>
        <strong>{vaga.titulo || vaga.nome}</strong>
        <div style={{ fontSize: 13, color: "#555" }}>{vaga.empresa}</div>
        <div style={{ fontSize: 13, color: "#777" }}>{vaga.cidade} • {vaga.tipo}</div>
        <div style={{ marginTop: 6 }}>{vaga.descricao}</div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(vaga)} style={{ cursor: "pointer" }}>Editar</button>
        <button onClick={() => onDelete(vaga)} style={{ cursor: "pointer", color: "white", background: "#d9534f", border: "none", padding: "6px 10px", borderRadius: 6 }}>
          Excluir
        </button>
      </div>
    </div>
  );
}
