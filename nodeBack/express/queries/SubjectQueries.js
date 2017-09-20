module.exports = {
  FindById: `
    SELECT id, name
    FROM subject
    WHERE id = ?
    ;
  `,
  FindAllPublicByName:
  `
    SELECT DISTINCT sub.id, sub.name
    FROM course crs, course_has_document crsdoc, document doc, subject sub
    WHERE crs.id = crsdoc.course_id 
    AND doc.id = crsdoc.document_id
    AND doc.is_public = true
    AND crs.subject_id = sub.id
    AND sub.name LIKE ?
    ;
  `,
  FindAllByClassAndTeacherAndName:
  `
    SELECT sub.id, sub.name
    FROM course crs, subject sub
    WHERE crs.class_id = ?
    AND crs.teacher_id = ?
    AND crs.subject_id = sub.id
    AND sub.name LIKE ?
    ;
  `,
  // Reads
  FindAll: `SELECT * FROM subject;`,
  FindAllByTeacherId: `
    SELECT DISTINCT sub.*
    FROM course AS cou
    INNER JOIN subject AS sub ON sub.id = cou.subject_id
    WHERE cou.user_id = ?;
  `,
  // Writes
  Create: `
    INSERT INTO subject (name)
    VALUES (?);
  `,
  Update: `
    UPDATE subject
    SET name = ?
    WHERE id = ?;
  `,
  Delete: `DELETE FROM subject WHERE id = ?;`
};