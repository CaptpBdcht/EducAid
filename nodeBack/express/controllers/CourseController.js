let CourseQueries = require('../queries').CourseQueries;

function CourseController() {}

CourseController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAll, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findFormattedByCourseId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindFormattedByCourseId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllFormatted = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAllFormatted, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllFormattedByClassUserId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAllFormattedByClassUserId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllFormattedByTeacherId = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAllFormattedByTeacherId, [ id ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllFormattedByClassId = (connection, classid) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAllFormattedByClassId, [ classid ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllFormattedByClassIdAndTeacherIdAndName = (connection, req) => {
  return new Promise((resolve, reject) => {
    const params = [ req.params.classid, req.params.teacherid, '%' + req.params.subjectname + '%' ];
    connection.query(CourseQueries.FindAllFormattedByClassIdAndTeacherIdAndName, params, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findByUserId = (connection, req) => {
  return new Promise((resolve, reject) => {
    const userid = req.params.userid;
    connection.query(CourseQueries.FindByUserId, [ userid ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findByClassId = (connection, req) => {
  return new Promise((resolve, reject) => {
    const classid = req.params.classid;
    connection.query(CourseQueries.FindByClassId, [ classid ], (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.findAllPublic = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(CourseQueries.FindAllPublic, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

CourseController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.subjectId || !req.body.classId || !req.body.teacherId) {
      reject("Missing body parameters");
    }

    let values = [
      req.body.classId,
      req.body.subjectId,
      req.body.teacherId
    ];

    connection.query(CourseQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating course" }));
      else
        resolve(rows[0]);
    });
  });
};

CourseController.prototype.update = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.id ||
        !req.body.subjectId || !req.body.classId || !req.body.teacherId) {
      reject("Missing body parameters");
    }

    let values = [
      req.body.classId,
      req.body.subjectId,
      req.body.teacherId,
      req.body.id
    ];

    connection.query(CourseQueries.Update, values, (error, rows, fields) => {
      if (error) reject(error);
      else resolve({ success: "Course updated" });
    });
  });
};

CourseController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(CourseQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "Course not found" }));
        else
          resolve({ success: "Course deleted" });
      });
    }
  });
};

module.exports = new CourseController();