module.exports = {
  FindById: `
    SELECT id, name
    FROM specialty
    WHERE id = ?
    ;
  `,
  // Reads
  FindAll: `SELECT * FROM specialty;`,

  FindAllByName:
  `
    SELECT id, name
    FROM specialty
    WHERE name LIKE ?
    ;
  `,

  // Writes
  Create: `
    INSERT INTO specialty (name)
    VALUES (?);
  `,
  Update: `
    UPDATE specialty
    SET name = ?
    WHERE id = ?;
  `,
  Delete: `DELETE FROM specialty WHERE id = ?;`
};