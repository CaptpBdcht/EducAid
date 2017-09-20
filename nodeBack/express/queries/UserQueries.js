module.exports = {
  // Reads
  FindAll: `SELECT * FROM user;`,
  FindAllTeachers: `SELECT * FROM user WHERE role = 'TEACHER';`,
  FindAllStudents: `SELECT * FROM user WHERE role = 'STUDENT';`,
  FindByID: `SELECT * FROM user WHERE id = ?;`,
  GetAvatarPath: `SELECT avatar FROM user WHERE id = ?;`,
  GetKidPictureById: `SELECT kid_picture FROM user WHERE id = ?;`,
  // Writes
  Create: `
    INSERT INTO user (username, password, firstname, lastname, activated, locked, role)
    VALUES (?, '$2a$10$Vf0axSMoLDYjYgcGSs9Nquzey0tfH0kltpC/3aMfAvSpE0KWzUepu', ?, ?, ?, 0, ?);
  `,
  Update: `
    UPDATE user
    SET
      username = ?,
      firstname = ?,
      lastname = ?,
      role = ?,
      activated = ?,
      locked = ?,
      modified = NOW()
    WHERE id = ?;
  `,
  UpdateAvatar: `UPDATE user SET avatar = ? WHERE id = ?;`,
  UpdateKidPicture: `UPDATE user SET kid_picture = ? WHERE id = ?;`,
  UpdatePassword: `UPDATE user SET password = ? WHERE id = ?;`,
  Delete: `DELETE FROM user WHERE id = ?;`
};
