let CourseHasDocumentController = require('../controllers').CourseHasDocumentController;

module.exports = (app, connection) => {
  app.post('/api/courseHasDocument', (req, res) => {
		CourseHasDocumentController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/courseHasDocument/:documentId/:courseId', (req, res) => {
		CourseHasDocumentController.delete(connection, req.params.documentId, req.params.courseId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
