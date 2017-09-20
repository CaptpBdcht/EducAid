let LevelHasSpecialtyController = require('../controllers').LevelHasSpecialtyController;

module.exports = (app, connection) => {
	app.get('/api/levelHasSpecialty/all/formatted', (req, res) => {
		LevelHasSpecialtyController.findAllFormatted(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/levelHasSpecialty/all/formatted/:id', (req, res) => {
		LevelHasSpecialtyController.findAllFormattedById(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.post('/api/levelHasSpecialty', (req, res) => {
		LevelHasSpecialtyController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/levelHasSpecialty', (req, res) => {
		LevelHasSpecialtyController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/levelHasSpecialty/:id', (req, res) => {
		LevelHasSpecialtyController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
