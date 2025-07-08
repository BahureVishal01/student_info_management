import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails'; 

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Student Management App</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
