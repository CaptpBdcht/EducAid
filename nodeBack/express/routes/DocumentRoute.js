let DocumentController = require('../controllers').DocumentController;
const fileUploader  = require('../utils/file-uploader');

module.exports = (app, connection) => {
  app.get('/api/document/all', (req, res) => {
		DocumentController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.get('/api/document/all/public', (req, res) => {
		DocumentController.findAllPublic(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/document/all/incourse/:id', (req, res) => {
		DocumentController.findAllInCourse(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.get('/api/document/all/outcourse/:courseId/:subjectId', (req, res) => {
		DocumentController.findAllNotInCourse(connection, req.params.courseId, req.params.subjectId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/document/all/public/unclassified', (req, res) => {
		DocumentController.findAllPublicUnclassified(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/document/all/public/subject/:subjectid', (req, res) => {
		DocumentController.findAllPublicBySubjectId(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/document/all/private/course/:courseid', (req, res) => {
		DocumentController.findAllPrivateByCourse(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.post('/api/document', (req, res) => {
		DocumentController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.post('/api/document/upload/:class/:course?', (req, res) => {
		fileUploader.setPath(req, res)
		.then((createdDocumentId) => {
			fileUploader.upload(req, res, function (err) {
				if (err) {
					// An error occurred when uploading
					console.log(err);
					return res.status(422).send("an Error occured");
				}  
				
				// No error occured.
				const path = req.file.path;
				return res.send("Upload Completed for " + path); 
			});
		});    
	});

	app.delete('/api/document/:documentId/:URL', (req, res) => {
		DocumentController.delete(connection, req.params.documentId)
		.then(result => res.status(200).json(result))
		.then(result => fileUploader.destroyFile(req.params.URL))
		.catch(error => res.status(400).json(error));
	});

};