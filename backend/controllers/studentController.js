const Student = require('../models/studentModel');
const Mark = require('../models/markModel');
exports.getAllStudents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const students = await Student.getAllStudents(limit, offset);
    const totalCount = await Student.getTotalStudents();

    if (students.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Student not found",
        data: [],
      });
    }

    const totalPage = Math.ceil(totalCount / limit);

    return res.status(200).json({
      success: true,
      message: "Student List",
      data: students,
      totalCount,
      totalPage,
      currentPage: page,
      limit,
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
         console.log(studentId);
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.getStudentWithMarks(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student details",
      data: student,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
       console.log(req.body);      
      let isStudentExists = await Student.getStudentByEmail(req.body.email);
      if(isStudentExists.rowCount >0 ){
        
        return res.status(200).json({ success:false, message: "Student allready exists"});
      }
      
    const student = await Student.createStudent(req.body);
    if(student.length > 0){
        let marks = req.body.marks
        await Mark.addUpdatetMarks(marks, student[0].student_id);

      return res.status(201).json({success:true,message: "Student added successfully..!"});
    }
   
  } catch (err) {
    console.log(err.message);
   return res.status(500).json({success:false, message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const marks = req.body.marks;
     if (!studentId) {
      return res.status(200).json({
        success: false,
        message: "Invalid student ID",
      });
    }
    
    const student = await Student.updateStudent(studentId, req.body);
    
    if(student == 0) return res.status(404).json({success:false, message: "Student not found"});
    if(marks.length >0){

      await Mark.addUpdatetMarks(marks, studentId);
    }
    return res.status(200).json({success:true, message: "Student details updated successfully"})

  } catch (err) {
    return res.status(500).json({success:false, message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!studentId || isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const deleted = await Student.deleteStudent(studentId);
      console.log(deleted)
    if (deleted  == 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

