let bcrypt = require('bcrypt');

exports.cryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        reject(err);
      else {
        bcrypt.hash(password, salt, (herr, hash) => {
          if (err) reject(err);
          else resolve(hash);
        });
      }
    });
  });
};

exports.comparePassword = (password, userPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
      if (err) reject(err);
      else resolve(isPasswordMatch);
    });
  });
};