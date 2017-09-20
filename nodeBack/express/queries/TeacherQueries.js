module.exports = {
  FindAll: `
    SELECT id, user_id
    FROM teacher
    ;
  `,
  FindById: `
    SELECT id, user_id
    FROM teacher
    WHERE user_id = ?
    ;
  `
};
