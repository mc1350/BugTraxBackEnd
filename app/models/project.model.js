const sql = require("./db.js");
// constructor
const Project = function(project) {
  this.title = project.title;
  this.description = project.description;
};
Project.create = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created project: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};
Project.findById = (id, result) => {
  sql.query(`SELECT * FROM project WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Project with the id
    result({ kind: "not_found" }, null);
  });
};
Project.getAll = (title, result) => {
  let query = "SELECT * FROM project";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("projects: ", res);
    result(null, res);
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE project SET title = ?, description = ? WHERE id = ?",
    [project.title, project.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Project with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated project: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};
Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Project with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted project with id: ", id);
    result(null, res);
  });
};
Project.removeAll = result => {
  sql.query("DELETE FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} projects`);
    result(null, res);
  });
};
module.exports = Project;
