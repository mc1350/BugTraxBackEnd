const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
var path = require('path');

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bugtrax." });
// });
app.use(express.static(path.join(__dirname, 'build')));

//catch-all

require("./app/routes/project.routes.js")(app);
require("./app/routes/ticket.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/team.routes.js")(app);
require("./app/routes/assigned.routes.js")(app);
require("./app/routes/user.routes.js")(app);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});