let QCMController = require('../controllers').QCMController;

module.exports = (app, connection) => {
	app.get('/api/qcm/all', (req, res) => {
		QCMController.findAllQCM(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/qcm/question/all/:qcmId', (req, res) => {
		QCMController.findAllQCMQuestions(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.post('/api/qcm/:userId', (req, res) => {
		QCMController.create(connection, req)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});
};
