import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/snippets", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setSnippets(res.data));
  }, [token]);

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>ByteStash - Snippets</h1>
        <button className={styles.logoutBtn} onClick={logout}>
             <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.logoutIcon}
    viewBox="0 0 24 24"
    width="18"
    height="18"
    style={{ marginRight: "8px", verticalAlign: "middle" }}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
          Se déconnecter
        </button>
      </div>

      <input
        type="text"
        placeholder="Rechercher un snippet..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ marginBottom: "20px" }}>
  <Link to="/add-snippet" className={styles.logoutBtn}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      style={{ marginRight: "8px", verticalAlign: "middle" }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
    Ajouter un snippet
  </Link>
</div>

      <div className={styles.grid}>
        {filteredSnippets.map((snippet) => (
          <div key={snippet._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{snippet.title}</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>{snippet.language}</span>
                {snippet.tags &&
                  snippet.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
            <pre className={styles.codeBlock}>
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
