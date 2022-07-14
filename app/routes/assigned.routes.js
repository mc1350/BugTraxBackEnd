module.exports = app => {
  const assigned = require("../controllers/assigned.controller.js");
  var router = require("express").Router();
  // Create a new assigned
  router.post("/", assigned.create);
  // Retrieve all assigned
  router.get("/", assigned.findAll);
  // Retrieve a single assigned with id
  router.get("/:email", assigned.findOne);
  // Delete a assigned with id
  router.delete("/:id", assigned.delete);
  // Delete all assigned
  router.delete("/", assigned.deleteAll);
  app.use('/api/assigned', router);
};