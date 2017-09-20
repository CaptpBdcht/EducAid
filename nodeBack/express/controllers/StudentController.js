let StudentQueries = require('../queries').StudentQueries;

function StudentController() {}

StudentController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentQueries.FindAll, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentController.prototype.findByClassId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentQueries.FindAllByClassId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentController.prototype.findLastByUserId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentQueries.FindLastByUserId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentController.prototype.create = (connection, userId, classId) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentQueries.Create, [ userId, classId ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentController.prototype.delete = (connection, userId, classId) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentQueries.Delete, [ userId, classId ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

module.exports = new StudentController();
