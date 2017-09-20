let DocumentQueries = require('../queries').DocumentQueries;
const FileUploader  = require('../utils/file-uploader');
let multer = require("multer");

function DocumentController() {}

DocumentController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.FindAll, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

DocumentController.prototype.findAllPublic = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.FindAllPublic, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

DocumentController.prototype.findAllInCourse = (connection, courseId) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.FindAllInCourse, [ courseId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

DocumentController.prototype.findAllNotInCourse = (connection, courseId, subjectId) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.FindAllNotInCourse , [ courseId, subjectId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

DocumentController.prototype.findAllPublicUnclassified = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.FindAllPublicUnclassified, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

DocumentController.prototype.findAllPublicBySubjectId = (connection, req) => {
  return new Promise((resolve, reject) => {
    const subjectid = req.params.subjectid;
    connection.query(DocumentQueries.FindAllPublicBySubjectId, subjectid, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

DocumentController.prototype.findAllPrivateByCourse = (connection, req) => {
  return new Promise((resolve, reject) => {
    const courseId = req.params.courseid;
    connection.query(DocumentQueries.FindAllPrivateByCourse, courseId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

DocumentController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body.name || !req.body.URL) {
      reject("Missing body parameters");
    }

    let document = [
      req.body.name,
      req.body.URL,
      req.body.isPublic
    ];

    connection.query(DocumentQueries.Create, document, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating user" }));
      else
        resolve(rows.insertId);
    });
  });
};

DocumentController.prototype.delete = (connection, documentId) => {
  return new Promise((resolve, reject) => {
    connection.query(DocumentQueries.Delete, [ documentId ], (error, rows, fields) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

module.exports = new DocumentController();