const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  snippet: { type: mongoose.Schema.Types.ObjectId, ref: "Snippet" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
