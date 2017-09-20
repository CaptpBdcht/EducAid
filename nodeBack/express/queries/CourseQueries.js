module.exports = {
  FindAll: `
    SELECT class_id, subject_id, teacher_id 
    FROM course
    ;
  `,
  FindFormattedByCourseId: `
    SELECT
      cou.id AS id,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      cou.class_id AS classId,
      cou.subject_id AS subjectId,
      cou.user_id AS userId,
      usr.firstname AS userFirstname,
      usr.lastname AS userLastname,
      sub.name as subjectName,
      lev.name as levelName,
      spe.name as specialtyName,
      cla.year as year
    FROM course AS cou
    INNER JOIN user AS usr ON usr.id = cou.user_id
    INNER JOIN subject as sub ON sub.id = cou.subject_id
    INNER JOIN class as cla ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE cou.id = ?
    ;
  `,
  FindAllFormatted: `
    SELECT
      cou.id AS id,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      cou.class_id AS classId,
      cou.subject_id AS subjectId,
      cou.user_id AS userId,
      usr.firstname AS userFirstname,
      usr.lastname AS userLastname,
      sub.name as subjectName,
      lev.name as levelName,
      spe.name as specialtyName,
      cla.year as year
    FROM course AS cou
    INNER JOIN user AS usr ON usr.id = cou.user_id
    INNER JOIN subject as sub ON sub.id = cou.subject_id
    INNER JOIN class as cla ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    ;
  `,
  FindAllFormattedByClassUserId: `
    SELECT
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      cla.year AS year,
      cou.id AS id,
      sub.id AS subjectId,
      sub.name AS subject,
      lvl.name AS classLvl
    FROM class AS cla
    INNER JOIN student AS stu ON stu.class_id = cla.id
    LEFT JOIN course AS cou ON cou.class_id = cla.id
    LEFT JOIN subject AS sub ON sub.id = cou.subject_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lvl ON lvl.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE stu.user_id = ?
    ORDER BY cla.year DESC, cla.id DESC
    ;
  `,
  FindAllFormattedByClassId: `
    SELECT
      cou.id AS courseId,
      cou.user_id AS teacherId,
      sub.id AS subjectId,
      sub.name AS subjectName,
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id AS levelId,
      lev.name AS levelName,
      spe.id AS specialtyId,
      spe.name AS specialtyName,
      cla.year AS year
    FROM course AS cou
    INNER JOIN subject AS sub
        ON sub.id = cou.subject_id
    INNER JOIN class AS cla
        ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE cou.class_id = ?
    ;
  `,
  FindAllFormattedByTeacherId: `
    SELECT
      cou.id AS courseId,
      sub.id AS subId,
      sub.name AS subject,
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id AS levelId,
      lev.name AS level,
      spe.id AS specialtyId,
      spe.name AS specialty,
      cla.year AS year
    FROM course AS cou
    INNER JOIN subject AS sub ON sub.id = cou.subject_id
    INNER JOIN class AS cla ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE cou.user_id = ?
    ;
  `,
  FindAllFormattedByClassIdAndTeacherIdAndName: `
    SELECT
      cou.id AS courseId,
      sub.id AS subId,
      sub.name AS subject,
      cla.id AS classId,
      cla.level_has_specialty_id as levelHasSpecialtyId,
      lev.id AS levelId,
      lev.name AS level,
      spe.id AS specialtyId,
      spe.name AS specialty,
      cla.year AS year
    FROM course AS cou
    INNER JOIN subject AS sub
        ON sub.id = cou.subject_id
    INNER JOIN class AS cla
        ON cla.id = cou.class_id
    INNER JOIN level_has_specialty as lhs ON lhs.id = cla.level_has_specialty_id
    INNER JOIN level as lev ON lev.id = lhs.level_id
    LEFT JOIN specialty as spe ON spe.id = lhs.specialty_id
    WHERE cou.class_id = ?
    AND cou.user_id = ?
    AND sub.name LIKE ?
    ;
  `,
  Create: `
    INSERT INTO course (class_id, subject_id, user_id)
    VALUES (?, ?, ?)
    ;
  `,
  Update: `
    UPDATE course
    SET
      class_id = ?,
      subject_id = ?,
      user_id = ?
    WHERE id = ?
    ;
  `,
  Delete: `DELETE FROM course WHERE id = ?;`,
  //
  FindByUserId: `
    SELECT crs.class_id, crs.subject_id, crs.teacher_id 
    FROM course crs, class cls, student std
    WHERE crs.class_id = cls.id 
    AND std.class_id = cls.id
    AND std.user_id = ?
    ;
  `,
  FindByClassId: `
    SELECT crs.class_id, crs.subject_id, crs.user_id 
    FROM course crs, class cls
    WHERE crs.class_id = cls.id 
    AND cls.id = ?
    order by cls.id
    ;
  `,
  FindAllPublic: `
    SELECT crs.class_id, crs.subject_id, crs.teacher_id 
    FROM course crs, course_has_document crsdoc, document doc
    WHERE crs.id = crsdoc.course_id 
    AND doc.id = crsdoc.document_id
    AND doc.is_public = true
    ;
  `
};
