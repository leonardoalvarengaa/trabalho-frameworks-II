// src/components/EditVagaModal.jsx
import React, { useState, useEffect } from "react";

export default function EditVagaModal({ open, vaga, onClose, onSave }) {
  const [form, setForm] = useState({
    titulo: "", empresa: "", cidade: "", tipo: "", descricao: "", salario: ""
  });

  useEffect(() => {
    if (vaga) {
      setForm({
        titulo: vaga.titulo || vaga.nome || "",
        empresa: vaga.empresa || "",
        cidade: vaga.cidade || "",
        tipo: vaga.tipo || "",
        descricao: vaga.descricao || "",
        salario: vaga.salario ?? ""
      });
    }
  }, [vaga]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // converte salario para número se for preenchido
    const payload = { ...form, salario: form.salario ? Number(form.salario) : null };
    onSave(payload);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.4)", zIndex: 2000
    }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: 20, borderRadius: 8, width: 420 }}>
        <h3>Editar vaga</h3>
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" style={{ width: "100%", marginBottom: 8 }} required />
        <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Empresa" style={{ width: "100%", marginBottom: 8 }} />
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" style={{ width: "100%", marginBottom: 8 }} />
        <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo (CLT/PJ)" style={{ width: "100%", marginBottom: 8 }} />
        <textarea name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" style={{ width: "100%", marginBottom: 8 }} />
        <input name="salario" value={form.salario} onChange={handleChange} placeholder="Salário" style={{ width: "100%", marginBottom: 12 }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="submit" style={{ background: "#28a745", color: "white", border: "none", padding: "6px 12px", borderRadius: 6 }}>Salvar</button>
        </div>
      </form>
    </div>
  );
}
