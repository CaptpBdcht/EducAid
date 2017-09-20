module.exports = {
  FindAll: `
    SELECT user.*
    FROM student
    INNER JOIN user
            ON user.id = student.user_id
    ;
  `,
  FindAllByClassId: `
    SELECT user.*
    FROM student
    INNER JOIN user
            ON user.id = student.user_id
    WHERE class_id = ?
    ;
  `,
  FindLastByUserId: `
    SELECT 
      stu.id AS id,
        cla.id AS classId,
        cla.year AS year,
        lev.name AS levelName,
        spe.name AS specialtyName
    FROM student AS stu
    INNER JOIN class AS cla ON cla.id = stu.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE stu.user_id = ?
    ORDER BY cla.year DESC;
  `,
  Create: `
    INSERT INTO student (user_id, class_id)
    VALUES (?, ?)
    ;
  `,
  Delete: `
    DELETE FROM student
    WHERE user_id = ? AND class_id = ?
    ;
  `
};
