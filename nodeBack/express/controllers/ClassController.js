let ClassQueries = require('../queries').ClassQueries;

function ClassController() {}

ClassController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(ClassQueries.FindAll, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

ClassController.prototype.findFormattedByClassId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(ClassQueries.FindFormattedByClassId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

ClassController.prototype.findAllFormatted = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(ClassQueries.FindAllFormatted, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

ClassController.prototype.findAllFormattedByTeacherId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(ClassQueries.FindAllFormattedByTeacherId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

ClassController.prototype.findAllFormattedByUserId = (connection, req) => {
  return new Promise((resolve, reject) => {
    const params = [ req.params.userid, req.params.userid ];
    connection.query(ClassQueries.FindAllFormattedByUserId, params, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

ClassController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.levelHasSpecialtyId || !req.body.year) {
      reject("Missing body parameters");
    }

    let values = [
      req.body.levelHasSpecialtyId,
      req.body.year
    ];

    connection.query(ClassQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating class" }));
      else
        resolve(rows[0]);
    });
  });
};

ClassController.prototype.update = (connection, req) => {
  console.warn(req.body);
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.levelHasSpecialtyId || !req.body.year || !req.body.id) {
      reject("Missing body parameters");
    }

    let values = [
      req.body.levelHasSpecialtyId,
      req.body.year,
      req.body.id
    ];

    connection.query(ClassQueries.Update, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve({ success: "Class updated" });
    });
  });
};

ClassController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(ClassQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Class not found" }));
        else
          resolve({ success: "Class deleted" });
      });
    }
  });
};

module.exports = new ClassController();