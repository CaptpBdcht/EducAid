let CourseHasDocumentQueries = require('../queries').CourseHasDocumentQueries;

function CourseHasDocumentController() {}

CourseHasDocumentController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.courseId || !req.body.documentId) {
      reject("Missing body parameters");
    }

    let values = [ 
      req.body.courseId,
      req.body.documentId
    ];

    connection.query(CourseHasDocumentQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating courseHasDocument" }));
      else
        resolve(rows[0]);
    });
  });
};

CourseHasDocumentController.prototype.delete = (connection, documentId, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseHasDocumentQueries.Delete, [ documentId, courseId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

module.exports = new CourseHasDocumentController();
