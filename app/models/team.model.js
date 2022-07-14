const sql = require("./db.js");
// constructor
const Team = function(team) {
  this.user = team.user;
  this.contact = team.contact;
  this.projectID = team.projectID;
};
Team.create = (newTeam, result) => {
  sql.query("INSERT INTO team SET ?", newTeam, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created team: ", { id: res.insertId, ...newTeam });
    result(null, { id: res.insertId, ...newTeam });
  });
};
Team.findById = (projectID, result) => {
  sql.query(`SELECT * FROM team WHERE projectID = ${projectID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found team: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Team with the id
    result({ kind: "not_found" }, null);
  });
};
Team.getAll = (projectID, result) => {
  let query = "SELECT * FROM team";
  if (projectID) {
    query += ` WHERE projectID LIKE '%${projectID}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("teams: ", res);
    result(null, res);
  });
};
Team.remove = (id, result) => {
  sql.query("DELETE FROM team WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Team with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted team with id: ", id);
    result(null, res);
  });
};
Team.removeAll = result => {
  sql.query("DELETE FROM team", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} teams`);
    result(null, res);
  });
};
module.exports = Team;
