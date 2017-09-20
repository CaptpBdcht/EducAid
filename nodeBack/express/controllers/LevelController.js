let LevelQueries = require('../queries').LevelQueries;

function LevelController() {}

LevelController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(LevelQueries.FindAll, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

LevelController.prototype.findAllByName = (connection, req) => {
  return new Promise((resolve, reject) => {
    const name = '%' + req.params.name + '%';
    connection.query(LevelQueries.FindAllByName, name, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

LevelController.prototype.findById = (connection, req) => {
  return new Promise((resolve, reject) => {
    const levelid = req.params.levelid;
    connection.query(LevelQueries.FindById, levelid, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

LevelController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name ];

    console.warn("level values");
    console.warn(values);

    connection.query(LevelQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating level" }));
      else
        resolve(rows[0]);
    });
  });
};

LevelController.prototype.update = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name || !req.body.id) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name, req.body.id ];

    connection.query(LevelQueries.Update, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating level" }));
      else
        resolve({ success: "Level updated" });
    });
  });
};

LevelController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(LevelQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Level not found" }));
        else
          resolve({ success: "Level deleted" });
      });
    }
  });
};

module.exports = new LevelController();
