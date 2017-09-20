const crypto      = require('crypto');
const UserQueries = require('../queries').UserQueries;
const CryptoUtil  = require('../utils/crypt-utils');

function UserController() {}

UserController.prototype.findAll = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(UserQueries.FindAll, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Users not found" }));
      else
        resolve(rows);
    });
  });
};

UserController.prototype.findAllTeachers = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(UserQueries.FindAllTeachers, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Teachers not found" }));
      else
        resolve(rows);
    });
  });
};

UserController.prototype.findAllStudents = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query(UserQueries.FindAllStudents, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Students not found" }));
      else
        resolve(rows);
    });
  });
};

UserController.prototype.findById = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(UserQueries.FindByID, [ id ], (error, rows, fields) => {
        if (error) reject(error);
        else resolve(rows[0]);
      });
    }
  });
};

UserController.prototype.getAvatarPath = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(UserQueries.GetAvatarPath, [ id ], (error, rows, fields) => {
        if (error) reject(error);
        else {
          const result = rows[0].avatar;
          const splittedResult = result.split('/');
          const name = splittedResult[splittedResult.length - 1];
          const value = {
            'name': name,
            'path': result.replace(name, '')
          };

          resolve(value);
        }
      });
    }
  });
};

UserController.prototype.getKidPictureById = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject({ error: "No ID given" });
    else {
      connection.query(UserQueries.GetKidPictureById, [ id ], (error, rows, fields) => {
        if (error) reject(error);
        else {
          const result = rows[0];
          resolve(result);
        }
      });
    }
  });
};

UserController.prototype.create = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.username || !req.body.firstname || !req.body.lastname ||
        !req.body.role) {
      reject(JSON.stringify({ error: "Missing body parameters" }));
    }

    let values = [
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.activated || 1,
      req.body.role
    ];

    connection.query(UserQueries.Create, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error creating user" }));
      else
        resolve(rows[0]);
    });
  });
};

UserController.prototype.update = (connection, req) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.id || !req.body.username || !req.body.firstname || !req.body.lastname ||
        !req.body.role) {
      reject(JSON.stringify({ error: "Missing body parameters" }));
    }

    let values = [
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.role,
      req.body.activated || 1,
      req.body.locked || 0,
      req.body.id
    ];

    connection.query(UserQueries.Update, values, (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating user" }));
      else
        resolve({ success: "User updated" });
    });
  });
};

UserController.prototype.updateAvatar = (connection, userId, path) => {
  return new Promise((resolve, reject) => {
    if (!userId || !path) {
      reject(JSON.stringify({ error: "Missing params" }));
    }

    connection.query(UserQueries.UpdateAvatar, [ path, userId ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating avatar" }));
      else
        resolve(JSON.stringify({ success: "Avatar updated" }));
    });
  });
};

UserController.prototype.updateKidPicture = (connection, userId, req) => {
  return new Promise((resolve, reject) => {
    if (!userId || !req.body.picture) {
      reject(JSON.stringify({ error: "Missing params" }));
    }

    const picture = req.body.picture;

    connection.query(UserQueries.UpdateKidPicture, [ picture, userId ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "Error updating picture" }));
      else
        resolve(JSON.stringify({ success: "Picture updated" }));
    });
  });
};

UserController.prototype.updatePassword = (connection, req, id) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.password) {
      reject(JSON.stringify({ error: "Missing body parameters" }));
    }

    CryptoUtil.cryptPassword(req.body.password)
    .then(value => {
      let values = [ value, id ];

      connection.query(UserQueries.UpdatePassword, values, (error, rows, fields) => {
        if (error) reject(error);
        else resolve(JSON.stringify({ success: "User password updated" }));
      });
    })
    .catch(error => resolve(error));
  });
};

UserController.prototype.delete = (connection, id) => {
  return new Promise((resolve, reject) => {
    if (!id)
      reject(JSON.stringify({ error: "No ID given" }));
    else {
      connection.query(UserQueries.Delete, [ id ], (error, rows, fields) => {
        if (error)
          reject(error);
        else if (rows.length === 0)
          reject(JSON.stringify({ error: "User not found" }));
        else
          resolve({ success: "User deleted" });
      });
    }
  });
};

module.exports = new UserController();
