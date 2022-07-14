const Ticket = require("../models/ticket.model.js");
// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Ticket
  const ticket = new Ticket({
    title: req.body.title,
    description: req.body.description,
    projectID: req.body.projectID,
    priority: req.body.priority,
    status: req.body.status,
    created: req.body.created,
    updated: req.body.updated,
    assigned: req.body.assigned
  });
  // Save Ticket in the database
  Ticket.create(ticket, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket."
      });
    else res.send(data);
  });
};
// Retrieve all Tickets from the database (with condition).
exports.findAll = (req, res) => {
  const projectID = req.query.projectID;
  Ticket.getAll(projectID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets."
      });
    else res.send(data);
  });
};
// Find a single Ticket with a id
exports.findOne = (req, res) => {
  Ticket.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ticket with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ticket with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
//Find ticket by Project
exports.findSpecific = (req, res) => {
  Ticket.findByProject(req.params.projectID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ticket with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ticket with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
// Update a Ticket identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Ticket.updateById(
    req.params.id,
    new Ticket(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ticket with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating ticket with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  Ticket.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found ticket with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete ticket with id " + req.params.id
        });
      }
    } else res.send({ message: `ticket was deleted successfully!` });
  });
};
// Delete all Tickets from the database.
exports.deleteAll = (req, res) => {
  Ticket.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tickets."
      });
    else res.send({ message: `All tickets were deleted successfully!` });
  });
};
