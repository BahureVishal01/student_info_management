import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { Button, Card, Table, Row, Col } from 'react-bootstrap';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);
        if (res.data.success) {
          setStudent(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch student:', err);
      }
    };
    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await API.delete(`/students/delete/${id}`);
        navigate('/');
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <Card className="p-4 shadow">
      <Row className="mb-3">
        <Col><h3>Student Details</h3></Col>
        <Col className="text-end">
          <Button variant="primary" className="me-2" onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </Button>
          <Button variant="danger" className="me-2" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col><strong>Full Name:</strong> {student.firstName} {student.lastName}</Col>
        <Col><strong>Email:</strong> {student.email}</Col>
      </Row>
      <Row className="mb-3">
        <Col><strong>Class:</strong> {student.class}</Col>
        <Col><strong>Gender:</strong> {student.gender}</Col>
      </Row>
      <Row className="mb-3">
        <Col><strong>Date of Birth:</strong> {student.date_of_birth?.split('T')[0]}</Col>
      </Row>

      <h5>Marks</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {student.marks && student.marks.map((mark, idx) => (
            <tr key={idx}>
              <td>{mark.subject}</td>
              <td>{mark.mark}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
