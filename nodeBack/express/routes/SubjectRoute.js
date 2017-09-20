let SubjectController = require('../controllers').SubjectController;

module.exports = (app, connection) => {
  app.get('/api/subject/all', (req, res) => {
		SubjectController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
  app.get('/api/subject/all/teacher/:id', (req, res) => {
		SubjectController.findAllByTeacherId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.get('/api/subject/:subjectid', (req, res) => {
		SubjectController.findById(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/subject/all/public/name/:subjectname', (req, res) => {
		SubjectController.findAllPublicByName(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/subject/all/class/:classid/teacher/:teacherid/name/:subjectname', (req, res) => {
		SubjectController.findAllByClassAndTeacherAndName(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.post('/api/subject', (req, res) => {
		SubjectController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/subject', (req, res) => {
		SubjectController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/subject/:id', (req, res) => {
		SubjectController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};