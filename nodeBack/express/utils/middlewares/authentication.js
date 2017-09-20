const AuthController = require('../../controllers').AuthController;

module.exports = (app, connection) => {
  app.use('/api\*', (req, res, next) => {
    const authorization = req && req.headers && req.headers.authorization;

    if (authorization) {
      const token = authorization.split(' ')[1];
      
      AuthController.authenticate(connection, token)
        .then(res => next())
        .catch(error => res.status(403).json(error));
    }
    else {
      res.status(401).json({ error: 'Access denied' });
    }
  });
};
