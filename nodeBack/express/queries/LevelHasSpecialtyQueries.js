module.exports = {
  FindAllFormated: `
    SELECT
      lhs.id AS id,
      lhs.level_id AS levelId, 
      specialty_id AS specialtyId,
      lvl.name AS levelName,
      spe.name AS specialtyName
    FROM level_has_specialty AS lhs
    INNER JOIN level AS lvl ON lvl.id = lhs.level_id
    LEFT JOIN specialty AS spe ON spe.id = lhs.specialty_id
    ORDER BY lvl.name ASC, spe.name ASC
    ;
  `,

  FindAllFormatedById: `
    SELECT
      lhs.id AS id,
      lhs.level_id AS levelId, 
      specialty_id AS specialtyId,
      lvl.name AS levelName,
      spe.name AS specialtyName
    FROM level_has_specialty AS lhs
    INNER JOIN level AS lvl ON lvl.id = lhs.level_id
    LEFT JOIN specialty AS spe ON spe.id = lhs.specialty_id
    WHERE lhs.id = ?
    ;
  `,

  Create: `
    INSERT INTO level_has_specialty (level_id, specialty_id)
    VALUES (?, ?);
  `,
  Update: `
    UPDATE level_has_specialty
    SET
      level_id = ?,
      specialty_id = ?
    WHERE id = ?
    ;
  `,
  Delete: `DELETE FROM level_has_specialty WHERE id = ? ;`
};
