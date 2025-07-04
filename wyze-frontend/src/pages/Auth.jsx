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
      <div className={styles.authCard}>
        <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nom d'utilisateur"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">{isLogin ? "Se connecter" : "S’inscrire"}</button>
        </form>
        <button className={styles.toggleBtn} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Vous n'avez pas encore de compte ? Créez-en un" : "Vous avez déjà un compte ? Connectez-vous "}
        </button>
      </div>
    </div>
  );
}
