let SubjectQueries = require('../queries').SubjectQueries;

function SubjectController() {}

SubjectController.prototype.findById = (connection, req) => {
  return new Promise((resolve, reject) => {
    const subjectid = req.params.subjectid;
    connection.query(SubjectQueries.FindById, [ subjectid ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

SubjectController.prototype.findAllPublicByName = (connection, req) => {
  return new Promise((resolve, reject) => {
    const subjectname = '%' + req.params.subjectname + '%';
    connection.query(SubjectQueries.FindAllPublicByName, [ subjectname ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

//

SubjectController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(SubjectQueries.FindAll, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

SubjectController.prototype.findAllByTeacherId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(SubjectQueries.FindAllByTeacherId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

SubjectController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name ];

    connection.query(SubjectQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating subject" }));
      else
        resolve(rows[0]);
    });
  });
};

SubjectController.prototype.findAllByClassAndTeacherAndName = (connection, req) => {
  return new Promise((resolve, reject) => {
    const params = [ req.params.classid, req.params.teacherid, '%' + req.params.subjectname + '%' ];
    connection.query(SubjectQueries.FindAllByClassAndTeacherAndName, params, (error, result) => {
      if (error) reject(error);
      else resolve(result);
      });
  });
};

SubjectController.prototype.update = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name || !req.body.id) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name, req.body.id ];

    connection.query(SubjectQueries.Update, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating subject" }));
      else
        resolve({ success: "Subject updated" });
    });
  });
};

SubjectController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(SubjectQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Subject not found" }));
        else
          resolve({ success: "Subject deleted" });
      });
    }
  });
};

module.exports = new SubjectController();
