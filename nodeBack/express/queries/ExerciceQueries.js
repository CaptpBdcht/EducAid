module.exports = {
  FindAllByCourseId: `
    SELECT
      exe.id AS id,
        exe.name AS name,
        stexe.mark AS mark,
        stexe.last_mark AS lastMark,
        stexe.max_mark AS maxMark
    FROM course_has_exercice AS che
    LEFT JOIN exercice AS exe
          ON exe.id = che.exercice_id
    LEFT JOIN student_exercice AS stexe
          ON stexe.exercice_id = che.exercice_id AND stexe.student_id = ?
    WHERE che.course_id = ?
    ;
  `,
  FindAllInCourse: `
    SELECT
      exr.id AS id,
      exr.name AS name,
      sub.id AS subjectId,
      sub.name AS subject,
      lvl.id AS levelId,
      lvl.name AS level,
      che.course_id AS courseId
    FROM exercice AS exr
    INNER JOIN subject AS sub
        ON sub.id = exr.subject_id
    INNER JOIN level AS lvl
        ON lvl.id = exr.level_id
    INNER JOIN course_has_exercice AS che
        ON che.exercice_id = exr.id
        AND che.course_id = ?
    ;
  `,
  FindAllNotInCourse: `
    SELECT DISTINCT
      exr.id AS id,
      exr.name AS name,
      sub.id AS subjectId,
      sub.name AS subject,
      lvl.id AS levelId,
      lvl.name AS level
    FROM exercice AS exr
    INNER JOIN subject AS sub
      ON sub.id = exr.subject_id
      AND sub.id = ?
    INNER JOIN level AS lvl
      ON lvl.id = exr.level_id
    LEFT JOIN course_has_exercice AS che
      ON che.exercice_id = exr.id
      AND che.course_id != ?
    ;
  `,
  FindQCMByExerciceId: `
    SELECT
      exe.name AS exerciceName,
      qcm.id AS qcmId,
        qcm.title AS qcmTitle,
        qcmqq.answer_nb AS answerNb,
        qcmqq.question,
        qcmqq.answer1,
        qcmqq.answer2,
        qcmqq.answer3,
        qcmqq.answer4,
        qcmqq.answer5
    FROM exercice AS exe
    LEFT JOIN qcm AS qcm ON qcm.exercice_id = exe.id
    LEFT JOIN qcm_question AS qcmqq ON qcmqq.qcm_id = qcm.id
    WHERE exe.id = ?
    ;
  `,
  Create: `
    INSERT INTO exercice (subject_id, level_id, name)
    VALUES (?, ?, ?)
    ;
  `,
  CreateLinkCourse: `
    INSERT INTO course_has_exercice (course_id, exercice_id)
    VALUES (?, ?)
    ;
  `,
  Delete: `DELETE FROM exercice WHERE id = ?;`,
  DeleteLinkCourse: `
    DELETE FROM course_has_exercice
    WHERE course_id = ? AND exercice_id = ?
    ;
  `
};