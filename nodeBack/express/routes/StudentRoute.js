let StudentController = require('../controllers').StudentController;

module.exports = (app, connection) => {
  app.get('/api/student/all', (req, res) => {
		StudentController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.get('/api/student/all/:classId', (req, res) => {
		StudentController.findByClassId(connection, req.params.classId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/student/:userId/last', (req, res) => {
		StudentController.findLastByUserId(connection, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.post('/api/student/:userId/:classId', (req, res) => {
		StudentController.create(connection, req.params.userId, req.params.classId)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/student/:userId/:classId', (req, res) => {
		StudentController.delete(connection, req.params.userId, req.params.classId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
