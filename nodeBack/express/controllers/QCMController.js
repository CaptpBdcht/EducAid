let ExerciceQueries = require('../queries').ExerciceQueries;
let QCMQueries = require('../queries').QCMQueries;

function QCMController() {}

QCMController.prototype.findAllQCM = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(QCMQueries.FindAllQCM, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

QCMController.prototype.findAllQCMQuestions = (connection, req) => {
  return new Promise((resolve, reject) => {
    connection.query(QCMQueries.FindAllQCMQuestions, [ req.params.qcmId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

QCMController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.title || !req.body.questions ||
        !req.body.name || !req.body.levelId || !req.body.subjectId) {
      reject("Missing body parameters");
    }

    let exerciceValues = [ req.body.subjectId, req.body.levelId, req.body.name ];

    connection.query(ExerciceQueries.Create, exerciceValues, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating exercice" }));
      else {
        let values = [ req.params.userId, rows.insertId, req.body.title ];

        connection.query(QCMQueries.CreateQCM, values, (error, rows, fields) => {
          if (error)
            reject(error);
          else if (rows.length === 0)
            reject(JSON.stringify({ error: "Error creating qcm" }));
          else {
            return createQuestions(connection, req.body.questions, rows.insertId);
          }
        });
      }
    });
  });
};

const createQuestions = (connection, questions, qcmId) => {
  return new Promise((resolve, reject) => {
    /* jshint ignore:start */
    for (var question of questions) {
      let values = [
        qcmId,
        question.answerNb,
        question.question,
        question.answer1,
        question.answer2,
        question.answer3,
        question.answer4,
        question.answer5
      ];

      connection.query(QCMQueries.CreateQuestion, values, (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Error creating qcm question" }));
      });
    }
    /* jshint ignore:end */
    resolve(true);
  });
};

module.exports = new QCMController();
