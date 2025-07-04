const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const {
  createSnippet,
  getAllSnippets,
  getSnippetById,
} = require("../controllers/snippet.controller");

router.post("/", auth, createSnippet);
router.get("/", auth, getAllSnippets);
router.get("/:id", auth, getSnippetById);

module.exports = router;
