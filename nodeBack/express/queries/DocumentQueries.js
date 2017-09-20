module.exports = {
  FindAll: `
    SELECT DISTINCT id, name, URL, is_public 
    FROM document
    ;
  `,
  FindAllPublic: `
    SELECT DISTINCT id, name, URL, is_public 
    FROM document
    WHERE is_public = true
    ;
  `,
  FindAllPublicUnclassified: `
    SELECT DISTINCT id, name, URL, is_public 
    FROM document
    WHERE is_public = true
    AND id NOT IN (SELECT document_id 
                   FROM course_has_document)
    ;
  `,

  FindAllInCourse: `
    SELECT DISTINCT
      doc.id AS id,
      doc.name AS name,
      doc.URL as URL,
      doc.is_public as isPublic,
      sub.id AS subjectId,
      sub.name AS subject
    FROM document AS doc
    LEFT JOIN course_has_document AS chd
      ON chd.document_id = doc.id
      AND chd.course_id = ?
    INNER JOIN course AS crs
	  ON crs.id = chd.course_id
    INNER JOIN subject AS sub
      ON sub.id = crs.subject_id
    ;
  `,

  FindAllNotInCourse: `
    SELECT DISTINCT
      doc.id AS id,
      doc.name AS name,
      doc.URL as URL,
      doc.is_public as isPublic,
      sub.id AS subjectId,
      sub.name AS subject
    FROM document AS doc
    LEFT JOIN course_has_document AS chd
      ON chd.document_id = doc.id
      AND chd.course_id != ?
    LEFT JOIN course AS crs
	  ON crs.id = chd.course_id
    LEFT JOIN subject AS sub
      ON sub.id = crs.subject_id
      AND sub.id = ?
    ;
  `,

  FindAllPublicBySubjectId: `
    SELECT DISTINCT doc.id, doc.name, doc.URL, doc.is_public 
    FROM course crs, course_has_document crsdoc, document doc
    WHERE crs.id = crsdoc.course_id 
    AND crsdoc.document_id = doc.id
    AND doc.is_public = true
    AND crs.subject_id = ?
    ;
  `,
  FindAllPrivateByCourse: `
    SELECT DISTINCT doc.id, doc.name, doc.URL, doc.is_public 
    FROM course crs, course_has_document crsdoc, document doc
    WHERE crs.id = crsdoc.course_id 
    AND crsdoc.document_id = doc.id
    AND crs.id = ?
    AND doc.is_public = false
    order by doc.name asc
    ;
  `,
  Create: `
    INSERT INTO document (name, URL, is_public)
    VALUES (?, ?, ?);
  `,
  Delete:`
    DELETE FROM document 
    WHERE id = ?;
  `
};
