const sql = require("./db.js");
// constructor
const Comment = function(comment) {
  this.user = comment.user;
  this.body = comment.body;
  this.created = comment.created;
  this.ticketID = comment.ticketID;
};
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};
Comment.findById = (ticketID, result) => {
  sql.query(`SELECT * FROM comment WHERE ticketID = ${ticketID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found comment: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Comment with the id
    result({ kind: "not_found" }, null);
  });
};
Comment.getAll = (ticketID, result) => {
  let query = "SELECT * FROM comment";
  if (ticketID) {
    query += ` WHERE ticketID LIKE '%${ticketID}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("comments: ", res);
    result(null, res);
  });
};
Comment.remove = (id, result) => {
  sql.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Comment with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted comment with id: ", id);
    result(null, res);
  });
};
Comment.removeAll = result => {
  sql.query("DELETE FROM comment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} comments`);
    result(null, res);
  });
};
module.exports = Comment;
