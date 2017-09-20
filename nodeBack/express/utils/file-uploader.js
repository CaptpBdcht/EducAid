const bodyParser = require("body-parser");
const multer = require("multer");
const mkdirp = require('mkdirp');
const fs = require('fs');
const deleteEmpty = require('delete-empty');

let newDestination = '';

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, newDestination);
  },
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
exports.upload = multer({storage: storage}).single('File');

exports.destroyFile = (documentURL) => {
  return new Promise((resolve, reject) => {
    fs.unlink('uploads/'+decodeURIComponent(documentURL));
    deleteEmpty.sync('uploads/');
    resolve(true);
  });
  
};

exports.setPath = (req, res) => {
  return new Promise((resolve, reject) => {
    let path = '';
    newDestination = './uploads/' + req.params.class.replace(/\s/g,'');
    if(req.params.course){
      newDestination += '/' + req.params.course.replace(/\s/g,'');
    }
    
    mkdirp(newDestination, function (err) {
      if (err){
        console.error(err);
        reject(err);
      } 
      else{
        resolve(newDestination);
      }
    });
  });
};

exports.setAvatarPath = (req, res) => {
  return new Promise((resolve, reject) => {
    newDestination = './uploads/users/' + req.params.userId.replace(/\s/g,'');

    mkdirp(newDestination, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else
        resolve(newDestination);
    });
  });
};
