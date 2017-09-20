let AuthController = require('../controllers').AuthController;

module.exports = (app, connection) => {
  app.post('/signin', (req, res) => {
		AuthController.signin(req, connection)
		.then(datas => {
			res.status(200).json({
				data: datas.user,
				token: datas.token
			});
		})
		.catch(error => res.status(400).json(error));
	});

	app.post('/signout', (req, res) => {
		AuthController.signout(req, connection)
		.then(datas => res.status(200).json(datas))
		.catch(error => res.status(400).json(error));
	});
};
