module.exports = {
  // AUTHENTICATION
  SignIn: `
    SELECT *
    FROM user
    WHERE username = ?
      AND activated = 1
    ;
  `,
  GetPasswordByUsername: `
    SELECT password
    FROM user
    WHERE username = ?
    ;
  `,
  SetNullToken: `
    UPDATE user
    SET token = null
    WHERE token = ?
    ;
  `,
  SetTokenByID: `
    UPDATE user
    SET token = ?
    WHERE id = ?
    ;
  `,
  FindByToken: `SELECT * FROM user WHERE token = ?;`,
};
