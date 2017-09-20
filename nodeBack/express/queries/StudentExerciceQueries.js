module.exports = {
  FindMark: `
    SELECT IFNULL(last_mark, mark) AS mark, max_mark
    FROM student_exercice
    WHERE student_id = ?
      AND exercice_id = ?;
  `,
  FindCourseEvolution: `
    SELECT stexe.*, exe.name AS exerciceName
    FROM student_exercice AS stexe
    INNER JOIN exercice AS exe ON exe.id = stexe.exercice_id
    WHERE student_id = ?
    AND exercice_id IN (
      SELECT exercice_id FROM course_has_exercice
      WHERE course_id = ?
    )
    ORDER BY created ASC;
  `,
  Create: `
    INSERT INTO student_exercice (student_id, exercice_id, mark, max_mark, created)
    VALUES (?, ?, ?, ?, NOW());
  `,
  Update: `
    UPDATE student_exercice
    SET last_mark = ?, max_mark = ?, modified = NOW()
    WHERE student_id = ? AND exercice_id = ?;
  ` 
};
