module.exports = app => {
  const ticket = require("../controllers/ticket.controller.js");
  var router = require("express").Router();
  // Create a new ticket
  router.post("/", ticket.create);
  // Retrieve all ticket
  router.get("/", ticket.findAll);
  // Retrieve all like project id
  router.get("/ticket/:projectID", ticket.findSpecific);
  // Retrieve a single ticket with id
  router.get("/:id", ticket.findOne);
  // Update a ticket with id
  router.put("/:id", ticket.update);
  // Delete a ticket with id
  router.delete("/:id", ticket.delete);
  // Delete all ticket
  router.delete("/", ticket.deleteAll);
  app.use('/api/ticket', router);
};