let TeacherController = require('../controllers').TeacherController;

module.exports = (app, connection) => {
  app.get('/api/teacher/all', (req, res) => {
		TeacherController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.get('/api/teacher/:userid', (req, res) => {
		TeacherController.findById(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
