module.exports = {
  FindAllPendingEvaluations: `
    SELECT
      hpr.id AS id,
      hpr.helpful AS helpful,
      usr.firstname AS firstname,
      usr.lastname AS lastname,
      exe.name AS exerciceName
    FROM help_request AS hpr
    LEFT JOIN user AS usr ON usr.id = hpr.user_id
    INNER JOIN exercice AS exe ON exe.id = hpr.exercice_id
    WHERE user_id_ask = ?
    AND hpr.helpful IS NULL
    AND hpr.user_id IS NOT NULL;
  `,
  FindAllHelpedByUserId: `
    SELECT
      hpr.id AS id,
      usr.firstname AS firstname,
      usr.lastname AS lastname,
      exe.name AS exerciceName,
      hpr.helpful AS helpful
    FROM help_request AS hpr
    LEFT JOIN user AS usr ON usr.id = hpr.user_id_ask
    INNER JOIN exercice AS exe ON exe.id = hpr.exercice_id
    WHERE user_id = ?;
  `,
  FindAllRequestsOnAllClassesByUserId: `
    SELECT 
      hpr.id AS id,
      usr.firstname AS firstname,
      usr.lastname AS lastname,
      exe.name AS exerciceName
    FROM help_request AS hpr 
    LEFT JOIN class AS cla ON cla.id = hpr.class_id_ask
    LEFT JOIN user AS usr ON usr.id = hpr.user_id_ask
    INNER JOIN exercice AS exe ON exe.id = hpr.exercice_id
    WHERE hpr.user_id IS NULL
    AND hpr.user_id_ask != ?
    AND cla.id IN (
      SELECT class_id FROM student AS stu WHERE stu.user_id = ?
    ) OR cla.id IN (
      SELECT cla.id FROM class AS cla
      INNER JOIN course AS cou ON cou.class_id = cla.id
      WHERE cou.user_id = ?
    )
    AND hpr.user_id IS NULL;
  `,
  Create: `
    INSERT INTO help_request(user_id_ask, class_id_ask, exercice_id)
    VALUES (?, ?, ?);
  `,
  UpdateHelper: `
    UPDATE help_request
    SET user_id = ?
    WHERE id = ?;
  `, 
  UpdateRating: `
    UPDATE help_request
    SET helpful = ?
    WHERE id = ?;
  `,
  DeleteByAskerAndExercice: `
    DELETE FROM help_request
    WHERE user_id_ask = ?
    AND exercice_id = ?
    AND user_id IS NULL;
  `
};
