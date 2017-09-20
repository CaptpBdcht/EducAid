let ExerciceController = require('../controllers').ExerciceController;
let ExerciceCourseController = require('../controllers').ExerciceCourseController;

module.exports = (app, connection) => {
	app.get('/api/exercice/all/:studentId/course/:courseId', (req, res) => {
		ExerciceController.findAllByCourseId(connection, req.params.studentId, req.params.courseId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.get('/api/exercice/all/incourse/:id', (req, res) => {
		ExerciceController.findAllInCourse(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
  
  app.get('/api/exercice/all/outcourse/:courseId/:subjectId', (req, res) => {
		ExerciceController.findAllNotInCourse(connection, req.params.courseId, req.params.subjectId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/exercice/qcm/:exerciceId', (req, res) => {
		ExerciceController.findQCMByExerciceId(connection, req.params.exerciceId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/exercice/:exerciceId/:courseId', (req, res) => {
		ExerciceCourseController.create(connection, req.params.exerciceId, req.params.courseId)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/exercice/exe/:exerciceId', (req, res) => {
		ExerciceController.delete(connection, req.params.exerciceId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/exercice/:exerciceId/:courseId', (req, res) => {
		ExerciceCourseController.delete(connection, req.params.exerciceId, req.params.courseId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};