let HelpRequestController = require('../controllers').HelpRequestController;

module.exports = (app, connection) => {
	app.get('/api/helprequest/all/pendingeval/:userId', (req, res) => {
		HelpRequestController.findAllPendingEvaluations(connection, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/helprequest/all/helped/:userId', (req, res) => {
		HelpRequestController.findAllHelperByUserId(connection, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/helprequest/all/class/all/user/:id', (req, res) => {
		HelpRequestController.findAllRequestsOnAllClassesByUserId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.post('/api/helprequest/:userId/:classId/:exerciceId', (req, res) => {
		HelpRequestController.create(connection, req.params.userId, req.params.classId, req.params.exerciceId)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/helprequest/:requestId/helper/:userId', (req, res) => {
		HelpRequestController.updateHelper(connection, req.params.userId, req.params.requestId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/helprequest/:requestId/rating/:rating', (req, res) => {
		HelpRequestController.updateRating(connection, req.params.rating, req.params.requestId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/helprequest/:user_id_ask/:exercice_id', (req, res) => {
		HelpRequestController.deleteByAskerAndExercice(
			connection,
			req.params.user_id_ask,
			req.params.exercice_id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
