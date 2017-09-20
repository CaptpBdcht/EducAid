let ExerciceQueries = require('../queries').ExerciceQueries;

function ExerciceCourseController() {}

ExerciceCourseController.prototype.create = (connection, exerciceId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.CreateLinkCourse, [ courseId, exerciceId ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating exercice-course" }));
      else
        resolve(rows[0]);
    });
  });
};

ExerciceCourseController.prototype.delete = (connection, exerciceId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(ExerciceQueries.DeleteLinkCourse , [ courseId, exerciceId ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Exercice-course not found" }));
      else
        resolve({ success: "Exercice-course deleted" });
    });
  });
};

module.exports = new ExerciceCourseController();
