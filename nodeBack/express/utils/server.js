const bodyParser  = require('body-parser');
const cors        = require('cors');
const morgan      = require('morgan');
const express     = require('express');
const app         = express();
const config      = require('./config');

const SetupExpress = (connection) => {
  return new Promise((resolve, reject) => {
    // Headers
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
    require('./middlewares/authentication')(app, connection);

    // API routes
    require('../routes')(app, connection);

    resolve(app);
  });
};

const RunServer = (app) => {
  app.listen(config.port, () => {
    console.log("[~] Server started on port " + config.port);
  });
};

module.exports = {
  setup: SetupExpress,
  run: RunServer
};
