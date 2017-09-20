const crypto      = require('crypto');
const AuthQueries = require('../queries').AuthQueries;
const CryptoUtil  = require('../utils/crypt-utils');

function AuthController() {}

AuthController.prototype.authenticate = (connection, token) => {
  return new Promise((resolve, reject) => {
    connection.query(AuthQueries.FindByToken, [ token ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "User not found" }));
      else
        resolve(rows[0]);
    });
  });
};

AuthController.prototype.signin = (req, connection) => {
  return new Promise((resolve, reject) => {
    if (!req.body || !req.body.username || !req.body.password) {
      reject("Missing body parameters");
    }

    connection.query(AuthQueries.GetPasswordByUsername, [ req.body.username ], (error, rows, fields) => {
      if (error) {
        reject(error);
      }
      else if (rows.length === 0) {
        reject(JSON.stringify({ error: "User doesn't exist" }));
      }
      else {
        const dbRow = rows[0];
        
        CryptoUtil.comparePassword(req.body.password, dbRow.password)
        .then(res => {
          if (!res) reject(JSON.stringify({ error: "Wrong username or password" }));
          else {
            signAndTokenize(connection, req.body.username)
              .then(res => resolve(res))
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(JSON.stringify({ error: "Wrong username or password" })));
      }
    });
  });
};

const signAndTokenize = (connection, username) => {
  return new Promise((resolve, reject) => {
    connection.query(AuthQueries.SignIn, [ username ], (error, rows, fields) => {
      if (error) {
        reject(error);
      }
      else if (rows.length === 0) {
        reject(JSON.stringify({ error: "User not found" }));
      }
      else {
        const dbUser = rows[0];

        // Ensure hash uniqueness
        let currentDate = (new Date()).valueOf().toString();
        let random = Math.random().toString();

        // Token base
        const shaToken = crypto.createHmac('sha1', dbUser.username + dbUser.password)
                             .update(currentDate + random)
                             .digest('hex');

        saveTokenByID(connection, shaToken, dbUser.id)
          .then(res => resolve({ user: dbUser, token: shaToken }))
          .catch(err => reject(err));
      }
    });
  });
};

const saveTokenByID = (connection, token, id) => {
  return new Promise((resolve, reject) => {
    connection.query(AuthQueries.SetTokenByID, [ token, id ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "User not found [Token]" }));
      else
        resolve(true);
    });
  });
};

AuthController.prototype.signout = (req, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(AuthQueries.SetNullToken, [ req.body.token ], (error, rows, fields) => {
      if (error)
        reject(error);
      else if (rows.length === 0)
        reject(JSON.stringify({ error: "User not found" }));
      else
        resolve({ success: "Token removed" });
    });
  });
};

module.exports = new AuthController();
