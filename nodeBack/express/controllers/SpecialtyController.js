let SpecialtyQueries = require('../queries').SpecialtyQueries;

function SpecialtyController() {}

SpecialtyController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(SpecialtyQueries.FindAll, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

SpecialtyController.prototype.findAllByName = (connection, req) => {
  return new Promise((resolve, reject) => {
    const name = '%' + req.params.name + '%';
    connection.query(SpecialtyQueries.FindAllByName, name, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

SpecialtyController.prototype.findById = (connection, req) => {
  return new Promise((resolve, reject) => {
    const specialtyid = req.params.specialtyid;
    connection.query(SpecialtyQueries.FindById, specialtyid, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

SpecialtyController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name ];
    console.warn("specialty values");
    console.warn(values);

    connection.query(SpecialtyQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating specialty" }));
      else
        resolve(rows[0]);
    });
  });
};

SpecialtyController.prototype.update = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.name || !req.body.id) {
      reject("Missing body parameters");
    }

    let values = [ req.body.name, req.body.id ];

    connection.query(SpecialtyQueries.Update, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating specialty" }));
      else
        resolve({ success: "Specialty updated" });
    });
  });
};

SpecialtyController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(SpecialtyQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Specialty not found" }));
        else
          resolve({ success: "Specialty deleted" });
      });
    }
  });
};

module.exports = new SpecialtyController();
