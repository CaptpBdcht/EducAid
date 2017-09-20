let SpecialtyController = require('../controllers').SpecialtyController;

module.exports = (app, connection) => {
	app.get('/api/specialty/all', (req, res) => {
		SpecialtyController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/specialty/all/name/:name', (req, res) => {
		SpecialtyController.findAllByName(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/specialty/:specialtyid', (req, res) => {
		SpecialtyController.findById(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/specialty', (req, res) => {
		SpecialtyController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/specialty', (req, res) => {
		SpecialtyController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/specialty/:id', (req, res) => {
		SpecialtyController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};