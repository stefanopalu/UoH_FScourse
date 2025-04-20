const router = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

router.get("/:id/comments", async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment.find({ blog: blogId});

  response.json(comments);
});

module.exports = router;
