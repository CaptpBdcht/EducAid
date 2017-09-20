module.exports = {
  FindById: `
    SELECT id, name
    FROM level
    WHERE id = ?
    ;
  `,
  // Reads
  FindAll: `SELECT * FROM level;`,

  FindAllByName:
  `
    SELECT id, name
    FROM level
    WHERE name LIKE ?
    ;
  `,
  // Writes
  Create: `
    INSERT INTO level (name)
    VALUES (?);
  `,
  Update: `
    UPDATE level
    SET name = ?
    WHERE id = ?;
  `,
  Delete: `DELETE FROM level WHERE id = ?;`
};
