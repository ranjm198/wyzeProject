import { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function SnippetForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({ title: "", language: "", code: "" });
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/snippets", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Ajouter un snippet</h3>
      <input placeholder="Titre" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Langage" onChange={(e) => setForm({ ...form, language: e.target.value })} />
      <textarea placeholder="Code" onChange={(e) => setForm({ ...form, code: e.target.value })}></textarea>
      <button type="submit">Envoyer</button>
    </form>
  );
}
