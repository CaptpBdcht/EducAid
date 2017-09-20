let LevelHasSpecialtyQueries = require('../queries').LevelHasSpecialtyQueries;

function LevelHasSpecialtyController() {}

LevelHasSpecialtyController.prototype.findAllFormatted = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(LevelHasSpecialtyQueries.FindAllFormated, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

LevelHasSpecialtyController.prototype.findAllFormattedById = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(LevelHasSpecialtyQueries.FindAllFormatedById, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

LevelHasSpecialtyController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.levelId ) {
      reject("Missing body parameters");
    }

    let values = [ 
      req.body.levelId,
      req.body.specialtyId
    ];

    connection.query(LevelHasSpecialtyQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating LevelHasSpecialty" }));
      else
        resolve(rows[0]);
    });
  });
};

LevelHasSpecialtyController.prototype.update = (connection, req) => {
  console.warn(req.body);
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.levelId || !req.body.specialtyId) {
      reject("Missing body parameters");
    }

    let values = [ 
      req.body.levelId,
      req.body.specialtyId,
      req.body.id
    ];

    connection.query(LevelHasSpecialtyQueries.Update, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve({ success: "level has specialty updated" });
    });
  });
};

LevelHasSpecialtyController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Missing body parameters");
    }

    connection.query(LevelHasSpecialtyQueries.Delete, [ id ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "level has specialty not found" }));
      else
        resolve({ success: "level has specialty deleted" });
    });
  });
};

module.exports = new LevelHasSpecialtyController();
