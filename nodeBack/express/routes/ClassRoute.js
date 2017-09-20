let ClassController = require('../controllers').ClassController;

module.exports = (app, connection) => {
app.get('/api/class/:id', (req, res) => {
		ClassController.findByClassId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

  app.get('/api/class/all', (req, res) => {
		ClassController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/class/formatted/:id', (req, res) => {
		ClassController.findFormattedByClassId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/class/all/formatted', (req, res) => {
		ClassController.findAllFormatted(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/class/all/formatted/:id', (req, res) => {
		ClassController.findAllFormattedByTeacherId(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/class/all/formated/user/:userid', (req, res) => {
		ClassController.findAllFormattedByUserId(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/class', (req, res) => {
		ClassController.create(connection, req)
		.then(result => res.status(201).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/class', (req, res) => {
		ClassController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/class/:id', (req, res) => {
		ClassController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};