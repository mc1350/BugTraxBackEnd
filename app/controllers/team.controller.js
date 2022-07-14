const Team = require("../models/team.model.js");
// Create and Save a new team
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Team
  const team = new Team({
    user: req.body.user,
    contact: req.body.contact,
    projectID: req.body.projectID
  });
  // Save Team in the database
  Team.create(team, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the team."
      });
    else res.send(data);
  });
};
// Retrieve all Teams from the database (with condition).
exports.findAll = (req, res) => {
  const projectID = req.query.projectID;
  Team.getAll(projectID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teams."
      });
    else res.send(data);
  });
};
// Find a single team with a id
exports.findOne = (req, res) => {
  Team.findById(req.params.projectID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found team with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving team with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a team with the specified id in the request
exports.delete = (req, res) => {
  Team.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found team with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Team with id " + req.params.id
        });
      }
    } else res.send({ message: `Team was deleted successfully!` });
  });
};
// Delete all Teams from the database.
exports.deleteAll = (req, res) => {
  Team.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Teams."
      });
    else res.send({ message: `All Teams were deleted successfully!` });
  });
};
