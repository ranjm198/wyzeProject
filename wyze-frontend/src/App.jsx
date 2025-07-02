import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SnippetDetail from "./pages/SnippetDetail";
import AddSnippet from "./pages/AddSnippet";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-snippet" element={<AddSnippet />} />
      <Route path="/snippets/:id" element={<SnippetDetail />} />
    </Routes>
  );
}
