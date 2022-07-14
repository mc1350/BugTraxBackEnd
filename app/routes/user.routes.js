module.exports = app => {
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // Create a new user
  router.post("/", user.create);
  // Retrieve all user
  router.get("/", user.findAll);
  // Retrieve a single user with id
  router.get("/:id", user.findOne);
  // Delete a user with id
  router.delete("/:id", user.delete);
  // Delete all user
  router.delete("/", user.deleteAll);
  app.use('/api/user', router);
};