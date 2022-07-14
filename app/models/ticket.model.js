const sql = require("./db.js");
// constructor
const Ticket = function(ticket) {
  this.title = ticket.title;
  this.description = ticket.description;
  this.projectID = ticket.projectID;
  this.priority = ticket.priority;
  this.status = ticket.status;
  this.created = ticket.created;
  this.updated = ticket.updated;
  this.assigned = ticket.assigned;
};
Ticket.create = (newTicket, result) => {
  sql.query("INSERT INTO ticket SET ?", newTicket, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created ticket: ", { id: res.insertId, ...newTicket });
    result(null, { id: res.insertId, ...newTicket });
  });
};
exports.findAll = (req, res) => {
  const body = req.query.body;
  Ticket.getAll(body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};
Ticket.findById = (id, result) => {
  sql.query(`SELECT * FROM ticket WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found ticket: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Ticket with the id
    result({ kind: "not_found" }, null);
  });
};
Ticket.findByProject = (projectID, result) => {
  sql.query(`SELECT * FROM ticket WHERE projectID = ${projectID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found ticket: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Ticket with the id
    result({ kind: "not_found" }, null);
  });
};
Ticket.getAll = (projectID, result) => {
  let query = "SELECT * FROM ticket";
  if (projectID) {
    query += ` WHERE projectID LIKE '%${projectID}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tickets: ", res);
    result(null, res);
  });
};
Ticket.updateById = (id, ticket, result) => {
  sql.query(
    "UPDATE ticket SET title = ?, description = ?, projectID = ?, priority = ?, status = ?, created = ?, updated = ?, assigned = ? WHERE id = ?",
    [ticket.title, ticket.description, ticket.projectID, ticket.priority, ticket.status, ticket.created, ticket.updated, ticket.assigned, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Ticket with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated ticket: ", { id: id, ...ticket });
      result(null, { id: id, ...ticket });
    }
  );
};
Ticket.remove = (id, result) => {
  sql.query("DELETE FROM ticket WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Ticket with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted ticket with id: ", id);
    result(null, res);
  });
};
Ticket.removeAll = result => {
  sql.query("DELETE FROM ticket", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} tickets`);
    result(null, res);
  });
};
module.exports = Ticket;
