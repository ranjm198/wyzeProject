const Comment = require("../models/comment.model");

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const snippetId = req.params.id; 

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Le commentaire est vide" });
    }

    if (!snippetId) {
      return res.status(400).json({ message: "L'ID du snippet est requis" });
    }

    if (!require('mongoose').Types.ObjectId.isValid(snippetId)) {
      return res.status(400).json({ message: "ID de snippet invalide" });
    }

    const comment = await Comment.create({
      content: text,
      snippet: snippetId,
      author: req.user.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
