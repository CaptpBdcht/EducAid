module.exports = {
  Create: `
    INSERT INTO course_has_document (course_id, document_id)
    VALUES (?, ?);
  `,

  Delete:`
    DELETE FROM course_has_document 
    WHERE document_id = ? 
    AND course_id = ?;
  `
};
