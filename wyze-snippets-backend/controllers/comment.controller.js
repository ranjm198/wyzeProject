const Comment = require("../models/comment.model");

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.create({
    content,
    snippet: req.params.id,
    author: req.user.id,
  });
  res.json(comment);
};
