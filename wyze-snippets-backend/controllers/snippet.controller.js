const Snippet = require("../models/snippet.model");
const Comment = require("../models/comment.model");

exports.createSnippet = async (req, res) => {
  try {
    const { title, language, code } = req.body;

    if (!title || !language || !code) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const snippet = await Snippet.create({
      title,
      language,
      code,
      author: req.user.id,
    });

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate("author", "username");
    if (!snippet) {
      return res.status(404).json({ message: "Snippet non trouvé" });
    }

    const comments = await Comment.find({ snippet: snippet._id }).populate("author", "username");

    const snippetObj = snippet.toObject();
    snippetObj.comments = comments;

    res.json(snippetObj);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
