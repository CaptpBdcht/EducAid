let CourseController = require('../controllers').CourseController;

module.exports = (app, connection) => {
  app.get('/api/course/all', (req, res) => {
		CourseController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/formatted/:id', (req, res) => {
		CourseController.findFormattedByCourseId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/formatted', (req, res) => {
		CourseController.findAllFormatted(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/formatted/class/user/:userId', (req, res) => {
		CourseController.findAllFormattedByClassUserId(connection, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/formatted/class/:classId', (req, res) => {
		CourseController.findAllFormattedByClassId(connection, req.params.classId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/formatted/:id', (req, res) => {
		CourseController.findAllFormattedByTeacherId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/user/:userid', (req, res) => {
		CourseController.findByUserId(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/class/:classid', (req, res) => {
		CourseController.findByClassId(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/public', (req, res) => {
		CourseController.findAllPublic(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/course', (req, res) => {
		CourseController.create(connection, req)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/course/all/class/:classid/:teacherid/:subjectname', (req, res) => {
		CourseController.findAllFormattedByClassIdAndTeacherIdAndName(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/course', (req, res) => {
		CourseController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/course/:id', (req, res) => {
		CourseController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};