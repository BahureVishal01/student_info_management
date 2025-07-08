import React, { useState, useEffect } from 'react';
import API from '../api';
import { Button, Form, Modal } from 'react-bootstrap';

export default function StudentForm({ show, existingStudent, onClose, setPopup }) {

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    class: '',
    gender: '',
    birthDate: '',
    marks: [{ subject: '', mark: 0 }]
  });
const [validated, setValidated] = useState(false);
  
  useEffect(() => {
  const fetchStudent = async () => {
    let getExistingStudent;

    // Only fetch from API if student_id is provided
    if (existingStudent?.student_id) {
      const res = await API.get(`/students/${existingStudent.student_id}`);
      getExistingStudent = res.data?.data || existingStudent;
    }

    if (getExistingStudent) {
    

      setStudent({
        ...getExistingStudent,
        birthDate: getExistingStudent.date_of_birth?.split('T')[0] || '',
        marks: Array.isArray(getExistingStudent.marks) && getExistingStudent.marks.length > 0
          ? getExistingStudent.marks
          : [{ subject: '', mark: 0 }]
      });
    } else {
      setStudent({
        firstName: '',
        lastName: '',
        email: '',
        class: '',
        gender: '',
        birthDate: '',
        marks: [{ subject: '', mark: 0 }]
      });
    }
  };

  fetchStudent();
}, [existingStudent, show]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleMarkChange = (i, field, value) => {
    const updatedMarks = [...student.marks];
    updatedMarks[i][field] = value;
    setStudent({ ...student, marks: updatedMarks });
  };

  const addMarkField = () => {
    setStudent({ ...student, marks: [...student.marks, { subject: '', mark: '' }] });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    try {
      let response;
      if (existingStudent) {
        response = await API.put(`/students/update/${existingStudent.student_id}`, student);
      } else {
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        response = await API.post('/students/create', student);
      }

      if (response.data.success) {
        setPopup({
          show: true,
          title: 'Success!',
          message: response.data.message || (existingStudent ? 'Student updated successfully.' : 'Student added successfully.'),
          isConfirm: false,
          success: true
        });
      } else {
        setPopup({
          show: true,
          title: 'Failed!',
          message: response.data.message || 'Something went wrong.',
          isConfirm: false,
          success: false
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        title: 'Error!',
        message: error?.response?.data?.message || 'An error occurred.',
        isConfirm: false,
        success: false
      });
    }

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{existingStudent ? 'Edit Student' : 'Add Student'}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="First Name"
              name="firstName"
              value={student.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Last Name"
              name="lastName"
              value={student.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Email"
              name="email"
              type="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              placeholder="Class"
              name="class"
              value={student.class}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="date"
              name="birthDate"
              value={student.birthDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <h5>Marks</h5>
          {student.marks.map((mark, i) => (
            <div className="d-flex mb-2" key={i}>
              <Form.Control
                placeholder="Subject"
                value={mark.subject}
                onChange={(e) => handleMarkChange(i, 'subject', e.target.value)}
                className="me-2"
                required
              />
              <Form.Control
                placeholder="Mark"
                type="number"
                value={mark.mark}
                onChange={(e) => handleMarkChange(i, 'mark', e.target.value)}
                required
              />
            </div>
          ))}
          <Button size="sm" onClick={addMarkField}>+ Add Subject</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">
            {existingStudent ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
