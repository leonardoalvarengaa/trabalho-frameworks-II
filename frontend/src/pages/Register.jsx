import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("Usuário criado!");
      window.location.href = "/login";
    } catch (err) {
      alert("Erro ao registrar!");
    }
  }

  return (
    <div className="register-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
