let config      = require('./config');
let mysql       = require('mysql');

function MySQLConnector() {}

MySQLConnector.prototype.connect = () => {
  let connection = mysql.createConnection(config.database.connection);

  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) reject(error);
      else resolve(connection);
    });
  });
};

module.exports = new MySQLConnector();
