let TeacherQueries = require('../queries').TeacherQueries;

function TeacherController() {}

TeacherController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(TeacherQueries.FindAll, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

TeacherController.prototype.findById = (connection, req) => {
  return new Promise((resolve, reject) => {
    const userid = req.params.userid;
    connection.query(TeacherQueries.FindById, userid, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

module.exports = new TeacherController();
