let MySQLConnector  = require('./utils/mysql-connector');
let SetupExpress    = require('./utils/server').setup;
let RunServer       = require('./utils/server').run;
 
module.exports = () => {
  MySQLConnector.connect()
  .then(SetupExpress)
  .then(RunServer)
  .catch(error => console.error(error));
};
