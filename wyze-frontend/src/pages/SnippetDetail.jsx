import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import styles from "../styles/SnippetDetail.module.css";

export default function SnippetDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [snippet, setSnippet] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get(`/snippets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setSnippet(res.data));
  }, [id]);

  const handleAddComment = async () => {
    await api.post(`/snippets/${id}/comments`, { text: comment }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComment("");
    const res = await api.get(`/snippets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnippet(res.data);
  };

  if (!snippet) return <p>Chargement...</p>;

  return (
    <div className={styles.detail}>
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
      <h3>Commentaires :</h3>
      <ul>
        {snippet.comments?.map((c, i) => (
          <li key={i}>{c.text}</li>
        ))}
      </ul>
      <textarea placeholder="Ajouter un commentaire" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleAddComment}>Commenter</button>
    </div>
  );
}
