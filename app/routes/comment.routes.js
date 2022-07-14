module.exports = app => {
  const comment = require("../controllers/comment.controller.js");
  var router = require("express").Router();
  // Create a new comment
  router.post("/", comment.create);
  // Retrieve all comment
  router.get("/", comment.findAll);
  // Retrieve a single comment with id
  router.get("/comment/:projectID", comment.findOne);
  // Delete a comment with id
  router.delete("/:id", comment.delete);
  // Delete all comment
  router.delete("/", comment.deleteAll);
  app.use('/api/comment', router);
};