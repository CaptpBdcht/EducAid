let HelpRequestQueries = require('../queries').HelpRequestQueries;

function HelpRequestController() {}

HelpRequestController.prototype.findAllPendingEvaluations = (connection, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(HelpRequestQueries.FindAllPendingEvaluations, [ userId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.findAllHelperByUserId = (connection, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(HelpRequestQueries.FindAllHelpedByUserId, [ userId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.findAllRequestsOnAllClassesByUserId = (connection, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(HelpRequestQueries.FindAllRequestsOnAllClassesByUserId, [ userId, userId, userId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.create = (connection, userId, classId, exerciceId) => {
  return new Promise((resolve, reject) => {
    const values = [ userId, classId, exerciceId ];
    connection.query(HelpRequestQueries.Create, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.updateHelper = (connection, userId, requestId) => {
  return new Promise((resolve, reject) => {
    const values = [ userId, requestId ];
    connection.query(HelpRequestQueries.UpdateHelper, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.updateRating = (connection, rating, requestId) => {
  return new Promise((resolve, reject) => {
    const values = [ rating, requestId ];
    connection.query(HelpRequestQueries.UpdateRating, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

HelpRequestController.prototype.deleteByAskerAndExercice = (connection, user_id_ask, exercice_id) => {
  return new Promise((resolve, reject) => {
    connection.query(HelpRequestQueries.DeleteByAskerAndExercice, [ user_id_ask, exercice_id ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve({ success: "Help request deleted" });
    });
  });
};

module.exports = new HelpRequestController();
