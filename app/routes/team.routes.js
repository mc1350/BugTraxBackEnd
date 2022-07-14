module.exports = app => {
  const team = require("../controllers/team.controller.js");
  var router = require("express").Router();
  // Create a new team
  router.post("/", team.create);
  // Retrieve all team
  router.get("/", team.findAll);
  // Retrieve a single team with id
  router.get("/team/:projectID", team.findOne);
  // Delete a team with id
  router.delete("/:id", team.delete);
  // Delete all team
  router.delete("/", team.deleteAll);
  app.use('/api/team', router);
};