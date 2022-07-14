const sql = require("./db.js");
// constructor
const Assigned = function(assigned) {
  this.user = assigned.user;
  this.ticketID = assigned.ticketID;
  this.email=assigned.email;
};
Assigned.create = (newAssigned, result) => {
  sql.query("INSERT INTO assigned SET ?", newAssigned, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created assigned: ", { id: res.insertId, ...newAssigned });
    result(null, { id: res.insertId, ...newAssigned });
  });
};
Assigned.findById = (email, result) => {
  sql.query(
  `SELECT assigned.ticketID, ticket.title, ticket.projectID, ticket.status
   FROM assigned
   INNER JOIN ticket ON assigned.ticketID = ticket.id
   WHERE email = ${email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found assigned: ", res);
      result(null, res);
      return;
    }
    // not found assigned with the id
    result({ kind: "not_found" }, null);
  });
};
Assigned.getAll = (ticketID, result) => {
  let query = "SELECT * FROM assigned";
  if (ticketID) {
    query += ` WHERE ticketID LIKE '%${ticketID}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("assigneds: ", res);
    result(null, res);
  });
};
Assigned.remove = (id, result) => {
  sql.query("DELETE FROM assigned WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found assigned with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted assigned with id: ", id);
    result(null, res);
  });
};
Assigned.removeAll = result => {
  sql.query("DELETE FROM assigned", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} assigneds`);
    result(null, res);
  });
};
module.exports = Assigned;
