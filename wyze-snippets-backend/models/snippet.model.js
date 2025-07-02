const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: String,
  language: String,
  code: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Snippet", snippetSchema);
