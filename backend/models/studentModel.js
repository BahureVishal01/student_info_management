const db = require('../config/db');

const getAllStudents = async (limit, offset) => {
  const result = await db.query(
   `SELECT student_id, first_name, last_name, class, gender, email,
    TO_CHAR(date_of_birth, 'DD-MM-YYYY') AS date_of_birth 
    FROM students ORDER BY student_id LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
};

const getTotalStudents = async () => {
  const result = await db.query('SELECT COUNT(*) FROM students');
  return parseInt(result.rows[0].count, 10);
};

// Get student by ID with marks
const getStudentWithMarks = async (id) => {
  const studentRes = await db.query(`SELECT s.student_id,s.first_name,s.last_name,s.date_of_birth,s.gender,s.email,s.class,
  COALESCE(json_agg(m.*) FILTER (WHERE m.mark_id IS NOT NULL), '[]') AS marks FROM students s
  LEFT JOIN marks m ON s.student_id = m.student_id WHERE s.student_id = $1
  GROUP BY s.student_id,s.first_name,s.last_name,s.date_of_birth,s.gender,s.email,s.class`, [id]);
  return studentRes.rows[0] ;
};

// Create student
const createStudent = async (body) => {
   
  const res = await db.query(
    `INSERT INTO students (first_name, last_name, date_of_birth, gender, email, class)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [body.firstName, body.lastName, body.birthDate, body.gender, body.email, body.class]
  );
  return res.rows;
};



// Update student
const updateStudent = async (id, body) => {
 
  const res = await db.query(
  `UPDATE students SET 
  first_name = COALESCE($1, first_name),
  last_name = COALESCE($2, last_name),
  date_of_birth = COALESCE($3, date_of_birth),
  gender = COALESCE($4, gender),
  email = COALESCE($5, email),
  class = COALESCE($6, class)
  WHERE student_id = $7;`,
    [body.firstName, body.lastName, body.birthDate, body.gender, body.email, body.class, id]
  );
  
    return res.rowCount;
};


// Delete student
const deleteStudent = async (id) => {
  const result = await db.query('DELETE FROM students WHERE student_id = $1', [id]);
  console.log(result);
  return result.rowCount;
};

const getStudentByEmail = async (email) => {
 return result = await db.query('select * FROM students WHERE email = $1', [email]);
};

module.exports = {
  getAllStudents,
  getTotalStudents,
  getStudentWithMarks,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentByEmail,
};
