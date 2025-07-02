const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const {
  createSnippet,
  getAllSnippets,
  getSnippetById,
} = require("../controllers/snippet.controller");

router.post("/", auth, createSnippet);
router.get("/", getAllSnippets);
router.get("/:id", getSnippetById);

module.exports = router;
