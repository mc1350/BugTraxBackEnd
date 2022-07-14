const Project = require("../models/project.model.js");
// Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Project
  const project = new Project({
    title: req.body.title,
    description: req.body.description
  });
  // Save Project in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};
// Retrieve all Projects from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  Project.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    else res.send(data);
  });
};
// Find a single Project with a id
exports.findOne = (req, res) => {
  Project.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving project with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
// Update a Project identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Project.updateById(
    req.params.id,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found project with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  Project.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete project with id " + req.params.id
        });
      }
    } else res.send({ message: `Project was deleted successfully!` });
  });
};
// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    else res.send({ message: `All projects were deleted successfully!` });
  });
};
