import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import StudentForm from './StudentForm';
import API from '../api';
import CustomPopupModal from './CustomPopupModal';
import { useNavigate } from 'react-router-dom';
export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    isConfirm: false,
    success:false,
  });
  const fetchStudents = async () => {
    try {
      const res = await API.get('/students/list?limit=10&page=1');
      
      setStudents(res.data.data);
    } catch (error) { 
      console.error('Error fetching students:', error.message);
    }
  };
  const handleDelete = (id) => {

    setPopup({
      show: true,
      title: 'Are you sure?',
      message: 'If you delete this student, this action cannot be undone.',
      isConfirm: true,
      onConfirm: async () => {
        try {
          const response = await API.delete(`/students/delete/${id}`);
          setPopup({ ...popup, show: false });
          if (response.data.success) {
          fetchStudents();
          setPopup({
            show: true,
            title: 'Deleted!',
            message: response.data.message || 'Student deleted successfully.',
            isConfirm: false,
            success:true
          });
        } else {
          setPopup({
            show: true,
            title: 'Delete Failed',
            message: response.data.message || 'Failed to delete student.',
            isConfirm: false,
            success:false,
          });
        }
        } catch (err) {
          console.error(err.message);
        }
      },
    });
  };

 
   const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <Button onClick={() => {
      setEditingStudent(null);
      setShowModal(true); 
    }}>
      Add Student
    </Button>

       <StudentForm
      show={showModal} 
      existingStudent={editingStudent}
      onClose={() => {
        setShowModal(false); 
        fetchStudents();
      
      }}
        setPopup={setPopup}
    />


      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          { console.log(students)}
          {students.map((s) => (
           
            <tr key={s.student_id}>
              <td>{s.first_name} {s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.class}</td>
              <td>{s.gender}</td>
              <td>{s.date_of_birth}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(s)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(s.student_id)}>Delete</Button>{' '}
                <Button variant="info" size="sm" onClick={() => navigate(`/students/${s.student_id}`)}>View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CustomPopupModal
      show={popup.show}
      title={popup.title}
      message={popup.message}
      onConfirm={popup.onConfirm}
      onCancel={() => setPopup({ ...popup, show: false })}
      isConfirm={popup.isConfirm}
      success={popup.success}
      />
    </div>
    
  );
}