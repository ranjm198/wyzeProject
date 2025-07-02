const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const { addComment } = require("../controllers/comment.controller");

router.post("/:id/comments", auth, addComment);

module.exports = router;
