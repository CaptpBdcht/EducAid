let ExerciceQueries = require('../queries').ExerciceQueries;

function ExerciceController() {}

ExerciceController.prototype.findAllByCourseId = (connection, studentId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.FindAllByCourseId, [ studentId, courseId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

ExerciceController.prototype.findAllInCourse = (connection, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.FindAllInCourse, [ courseId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

ExerciceController.prototype.findAllNotInCourse = (connection, courseId, subjectId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.FindAllNotInCourse , [ subjectId, courseId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

ExerciceController.prototype.findQCMByExerciceId = (connection, exerciceId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.FindQCMByExerciceId , [ exerciceId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

ExerciceController.prototype.delete = (connection, exerciceId) => {
  console.warn('deleteuh');
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.Delete, [ exerciceId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

module.exports = new ExerciceController();
