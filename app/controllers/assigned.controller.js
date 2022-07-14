const Assigned = require("../models/assigned.model.js");
// Create and Save a new Assigned
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Assigned
  const assigned = new Assigned({
    user: req.body.user,
    ticketID: req.body.ticketID,
    email: req.body.email
  });
  // Save assigned in the database
  Assigned.create(assigned, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the assigned."
      });
    else res.send(data);
  });
};
// Retrieve all Assigned from the database (with condition).
exports.findAll = (req, res) => {
  const ticketID = req.query.ticketID;
  Assigned.getAll(ticketID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assigneds."
      });
    else res.send(data);
  });
};
// Find a single Assigned with a id
exports.findOne = (req, res) => {
  Assigned.findById(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found assigned with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving assigned with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};

// Delete a Assigned with the specified id in the request
exports.delete = (req, res) => {
  Assigned.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Assigned with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Assigned with id " + req.params.id
        });
      }
    } else res.send({ message: `Assigned was deleted successfully!` });
  });
};
// Delete all Assigned from the database.
exports.deleteAll = (req, res) => {
  Assigned.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Assigned."
      });
    else res.send({ message: `All Assigned were deleted successfully!` });
  });
};
