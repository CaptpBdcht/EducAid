let StudentExerciceQueries = require('../queries').StudentExerciceQueries;

function StudentExerciceController() {}

StudentExerciceController.prototype.findMark = (connection, studentId, exerciceId) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentExerciceQueries.FindMark, [ studentId, exerciceId ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentExerciceController.prototype.findCourseEvolution = (connection, studentId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(StudentExerciceQueries.FindCourseEvolution, [ studentId, courseId ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

StudentExerciceController.prototype.create = (connection, req, studentId, exerciceId) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.mark || !req.body.maxMark) {
      reject("Missing body parameters");
    }

    let values = [ studentId, exerciceId, req.body.mark, req.body.maxMark ];

    connection.query(StudentExerciceQueries.Create, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

StudentExerciceController.prototype.update = (connection, req, studentId, exerciceId) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.mark || !req.body.maxMark) {
      reject("Missing body parameters");
    }

    let values = [ req.body.mark, req.body.maxMark, studentId, exerciceId ];

    connection.query(StudentExerciceQueries.Update, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

module.exports = new StudentExerciceController();
