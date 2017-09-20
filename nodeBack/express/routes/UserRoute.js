let UserController = require('../controllers').UserController;
let fileUploader  = require('../utils/file-uploader');

module.exports = (app, connection) => {
  app.get('/api/user/all', (req, res) => {
		UserController.findAll(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
  app.get('/api/user/all/teacher', (req, res) => {
		UserController.findAllTeachers(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
  app.get('/api/user/all/student', (req, res) => {
		UserController.findAllStudents(connection)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/user/:id', (req, res) => {
		UserController.findById(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/user/:userId/avatar', (req, res) => {
		UserController.getAvatarPath(connection, req.params.userId)
		.then(file => {
			res.sendFile(file.name, {
				root: file.path,
				headers: {'Content-type': 'image/png'}
			});
		})
		.catch(error => res.status(400).json(error));
	});

	app.get('/api/user/:userId/kidPicture', (req, res) => {
		UserController.getKidPictureById(connection, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
	
	app.post('/api/user', (req, res) => {
		UserController.create(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/user', (req, res) => {
		UserController.update(connection, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/user/:userId/avatar', (req, res) => {
		fileUploader.setAvatarPath(req, res)
		.then(path => {
			return new Promise((resolve, reject) => {
				console.warn(res);
				fileUploader.upload(req, res, (err) => {
					if (err)
						reject(err);
					else
						resolve(path + '/' + req.file.originalname);
				});
			});
		})
		.catch(err => console.warn(err))
		.then(path => UserController.updateAvatar(connection, req.params.userId, path))
		.then(result => res.status(200).json(result))
		.catch(error => res.status(409).json(error)); 
	});

	app.put('/api/user/:userId/kidPicture', (req, res) => {
		UserController.updateKidPicture(connection, req.params.userId, req)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.put('/api/user/password/:userId', (req, res) => {
		UserController.updatePassword(connection, req, req.params.userId)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});

	app.delete('/api/user/:id', (req, res) => {
		UserController.delete(connection, req.params.id)
		.then(result => res.status(200).json(result))
		.catch(error => res.status(400).json(error));
	});
};
