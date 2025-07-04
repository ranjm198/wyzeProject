import { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddSnippet.module.css";

export default function AddSnippet() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !language || !code) {
      setError("Veuillez remplir les champs titre, langage et code.");
      return;
    }


    try {
      await api.post(
        "/snippets",
        { title, language, code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/"); 
    } catch (err) {
      setError("Erreur lors de l'ajout du snippet.");
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Ajouter un snippet</h1>
      </div>

      <form className={styles.snippetForm} onSubmit={handleSubmit}>
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du snippet"
        />

        <label htmlFor="language">Langage</label>
        <input
          id="language"
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Exemple: JavaScript, Python..."
        />

        <label htmlFor="code">Code</label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Colle ton code ici..."
        />

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit">Ajouter le snippet</button>
      </form>
    </div>
  );
}
