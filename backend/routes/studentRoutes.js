const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.get('/list', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post('/create', controller.createStudent);
router.put('/update/:id', controller.updateStudent);
router.delete('/delete/:id', controller.deleteStudent);

module.exports = router;
