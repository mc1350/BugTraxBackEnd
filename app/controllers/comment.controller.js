const Comment = require("../models/comment.model.js");
// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Comment
  const comment = new Comment({
    user: req.body.user,
    body: req.body.body,
    created: req.body.created,
    ticketID: req.body.ticketID
  });
  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment."
      });
    else res.send(data);
  });
};
// Retrieve all Comments from the database (with condition).
exports.findAll = (req, res) => {
  const ticketID = req.query.ticketID;
  Comment.getAll(ticketID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};
// Find a single Comment with a id
exports.findOne = (req, res) => {
  Comment.findById(req.params.ticketID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving comment with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.id
        });
      }
    } else res.send({ message: `Comment was deleted successfully!` });
  });
};
// Delete all Comments from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments."
      });
    else res.send({ message: `All Comments were deleted successfully!` });
  });
};
