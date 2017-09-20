let LevelController = require('../controllers').LevelController;

module.exports = (app, connection) => {
	app.get('/api/level/all', (req, res) => {
		LevelController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/level/all/name/:name', (req, res) => {
		LevelController.findAllByName(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/level/:levelid', (req, res) => {
		LevelController.findById(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/level', (req, res) => {
		LevelController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/level', (req, res) => {
		LevelController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/level/:id', (req, res) => {
		LevelController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
