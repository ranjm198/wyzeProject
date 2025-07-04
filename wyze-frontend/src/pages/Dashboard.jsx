import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [comment, setComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      fetchSnippets();
    }
  }, [token]);

  const fetchSnippets = () => {
    api
      .get("/snippets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSnippets(res.data));
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSnippet = async (snippet) => {
    if (!snippet.comments) {
      setLoadingComments(true);
      const res = await api.get(`/snippets/${snippet._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedSnippet(res.data);
      setLoadingComments(false);
    } else {
      setSelectedSnippet(snippet);
    }
    setComment("");
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    await api.post(
      `/snippets/${selectedSnippet._id}/comments`,
      { text: comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res = await api.get(`/snippets/${selectedSnippet._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedSnippet(res.data);
    setComment("");
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>List - Snippets</h1>
        <button className={styles.logoutBtn} onClick={logout}>
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
          Ajouter un snippet
        </Link>
      </div>

      <div className={styles.grid}>
        {filteredSnippets.map((snippet) => (
          <div
            key={snippet._id}
            className={styles.card}
            style={{
              cursor: "pointer",
              border:
                selectedSnippet && selectedSnippet._id === snippet._id
                  ? "2px solid #238636"
                  : "none",
            }}
            onClick={() => handleSelectSnippet(snippet)}
          >
            <div className={styles.cardHeader}>
              <h3>{snippet.title}</h3>
              <p style={{ color: "#ccc", fontSize: "0.9rem", marginTop: "-10px" }}>
                Posté par <strong>{snippet.author?.username || "Anonyme"}</strong>
              </p>
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

      {selectedSnippet && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#161b22",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 4px 15px rgb(0 0 0 / 0.3)",
          }}
        >
          <h2>{selectedSnippet.title}</h2>
          <pre
            style={{
              backgroundColor: "#0d1117",
              padding: "14px",
              borderRadius: "8px",
              fontFamily: "'Fira Code', monospace",
              color: "#9cdcfe",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {selectedSnippet.code}
          </pre>

          <h3>Commentaires :</h3>
          {loadingComments ? (
            <p>Chargement...</p>
          ) : (
            <ul style={{ maxHeight: "150px", overflowY: "auto" }}>
              {selectedSnippet.comments?.length > 0 ? (
                selectedSnippet.comments.map((c, i) => (
                  <li key={i} style={{ marginBottom: "8px" }}>
                    <strong>{c.author?.username || "Utilisateur"}</strong> : {c.content}
                  </li>
                ))
              ) : (
                <p>Aucun commentaire.</p>
              )}
            </ul>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire"
          />
<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
  <button
    onClick={handleAddComment}
    style={{
      backgroundColor: "#238636",
      border: "none",
      color: "white",
      padding: "10px 18px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",
    }}
  >
    Ajouter un commentaire
  </button>
</div>

        </div>
      )}
    </div>
  );
}
