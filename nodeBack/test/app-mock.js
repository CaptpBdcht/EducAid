const bodyParser  = require('body-parser');
const cors        = require('cors');
const morgan      = require('morgan');
const express     = require('express');
const app         = express();
const mysql       = require('mysql');
const config      = require('../express/utils/config');

let connection = mysql.createConnection(config.database.connection);

connection.connect((error) => {
  if (error)
    console.error(error);
  else {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });

    // BodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // CORS
    app.use(cors());

    // Consulting uploaded files
    app.use(express.static('./uploads/'));
    
    // HTTP console logs
    app.use(morgan('dev'));

    // Authentication Middleware
    require('../express/utils/middlewares/authentication')(app, connection);

    // API routes
    require('../express/routes')(app, connection);

    app.listen(config.port);
  }
});

module.exports = app;
