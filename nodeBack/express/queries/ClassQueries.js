module.exports = {
  FindAll: `
    SELECT id, level_has_specialty_id, year
    FROM class
    ;
  `,
  FindFormattedByClassId: `
    SELECT
      cla.id as id,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id as levelId,
      lev.name as level,
      spe.id as specialtyId,
      spe.name as specialty,
      cla.year as year
    FROM class AS cla
    INNER JOIN level_has_specialty as lhs
        ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev
        ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe
        ON spe.id = lhs.specialty_id
    WHERE cla.id = ?
    ;
  `,
  FindAllFormatted: `
    SELECT
      cla.id as id,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id as levelId,
      lev.name as level,
      spe.id as specialtyId,
      spe.name as specialty,
      cla.year as year
    FROM class AS cla
    INNER JOIN level_has_specialty as lhs
        ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev
        ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe
        ON spe.id = lhs.specialty_id
    ;
  `,
  FindAllFormattedByTeacherId: `
    SELECT DISTINCT
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id as levelId,
      lev.name as level,
      spe.id as specialtyId,
      spe.name as specialty,
      cla.year as year
    FROM course AS cou
    INNER JOIN class as cla
        ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs
        ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev
        ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe
        ON spe.id = lhs.specialty_id
    WHERE cou.user_id = ?
    ;
  `,
  FindAllFormattedByUserId: `
    (SELECT DISTINCT
      cla.id AS id,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id as levelId,
      lev.name as level,
      spe.id as specialtyId,
      spe.name as specialty,
      cla.year as year
    FROM course AS cou
    INNER JOIN class as cla
        ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs
        ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev
        ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe
        ON spe.id = lhs.specialty_id
    WHERE cou.user_id = ?)
    UNION 
    (SELECT DISTINCT
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id as levelId,
      lev.name as level,
      spe.id as specialtyId,
      spe.name as specialty,
      cla.year as year
    FROM student std, course AS cou
    INNER JOIN class as cla
        ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs
        ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev
        ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe
        ON spe.id = lhs.specialty_id
    WHERE std.class_id = cla.id
    AND std.user_id = ?)
    ;
  `,
  FindByClassId: `SELECT * FROM class WHERE id = ?;`,
  Create: `
    INSERT INTO class (level_has_specialty_id, year)
    VALUES (?, ?)
    ;
  `,
  Update: `
    UPDATE class
    SET
      level_has_specialty_id = ?,
      year = ?
    WHERE id = ?
    ;
  `,
  Delete: `DELETE FROM class WHERE id = ?;`
};
