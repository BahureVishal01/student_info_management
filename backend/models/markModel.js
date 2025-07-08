const db = require('../config/db');


const addUpdatetMarks = async (marks, studentId) => {
  
  const queries = marks.map(mark => {
    return db.query(
      `INSERT INTO marks (student_id, subject, mark)
       VALUES ($1, $2, $3)
       ON CONFLICT (student_id, subject)
       DO UPDATE SET mark = EXCLUDED.mark, updated_at = CURRENT_TIMESTAMP`,
      [studentId, mark.subject, mark.mark]
    );
  });

  await Promise.all(queries);
};


module.exports = {
  addUpdatetMarks,
};