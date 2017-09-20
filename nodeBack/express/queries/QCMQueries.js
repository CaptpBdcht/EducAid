module.exports = {
  FindAllQCM: `
    SELECT * FROM qcm;
  `,
  FindAllQCMQuestions: `
    SELECT *
    FROM qcm_question
    WHERE qcm_id = ?
    ;
  `,
  CreateQCM: `
    INSERT INTO qcm (user_id, exercice_id, title)
    VALUES (?, ?, ?)
    ;
  `,
  CreateQuestion: `
    INSERT INTO qcm_question(qcm_id, answer_nb, question, answer1, answer2, answer3, answer4, answer5)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ;
  `
};
