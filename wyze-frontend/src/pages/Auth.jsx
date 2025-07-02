import { useState } from "react";
import { useAuth } from "../AuthContext";
import api from "../api";
import styles from "../styles/Auth.module.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(isLogin ? "/auth/login" : "/auth/register", form);
      if (res.data.token) login(res.data.token);
    } catch (err) {
      alert("Erreur : " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">{isLogin ? "Se connecter" : "S’inscrire"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Créer un compte" : "Déjà inscrit ?"}
      </button>
    </div>
  );
}
