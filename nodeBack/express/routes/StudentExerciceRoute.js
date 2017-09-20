let StudentExerciceController = require('../controllers').StudentExerciceController;

module.exports = (app, connection) => {
  app.get('/api/studentexe/:studentId/:exerciceId', (req, res) => {
		StudentExerciceController.findMark(
			connection,
			req.params.studentId,
			req.params.exerciceId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
  app.get('/api/studentexe/evolution/:studentId/:courseId', (req, res) => {
		StudentExerciceController.findCourseEvolution(
			connection,
			req.params.studentId,
			req.params.courseId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.post('/api/studentexe/:studentId/:exerciceId', (req, res) => {
		StudentExerciceController.create(
			connection, req,
			req.params.studentId,
			req.params.exerciceId)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.put('/api/studentexe/:studentId/:exerciceId', (req, res) => {
		StudentExerciceController.update(
			connection, req,
			req.params.studentId,
			req.params.exerciceId)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});
};
