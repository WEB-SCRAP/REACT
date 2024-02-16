import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    gender: '',
    semester: '',
    sgpa: '',
    courses: [],
  });
  const [errors, setErrors] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      
      const courses = studentData.courses.includes(value)
        ? studentData.courses.filter((course) => course !== value)
        : [...studentData.courses, value];
      setStudentData({ ...studentData, courses });
    } else {
      if (name === 'name') {
        
        const isValidName = /^[A-Za-z\s]+$/.test(value);
        if (!isValidName) {
          setErrors({ ...errors, [name]: 'Name should only contain letters' });
          return;
        }
      }
  
      setErrors({ ...errors, [name]: '' });

      setStudentData({ ...studentData, [name]: value });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!studentData.name) {
      errors.name = 'Name is required';
      formIsValid = false;
    }
    if (!studentData.email || !/\S+@\S+\.\S+/.test(studentData.email)) {
      errors.email = 'Valid email is required';
      formIsValid = false;
    }
    if (!studentData.gender) {
      errors.gender = 'Gender is required';
      formIsValid = false;
    }
    if (!studentData.semester || studentData.semester < 1 || studentData.semester > 8) {
      errors.semester = 'Valid Semester is required (1-8)';
      formIsValid = false;
    }
    if (!studentData.sgpa || isNaN(studentData.sgpa) || studentData.sgpa < 0 || studentData.sgpa > 10) {
      errors.sgpa = 'Valid SGPA is required (0-10 scale)';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const getGrade = (sgpa) => {
    sgpa = parseFloat(sgpa);
    if (sgpa >= 9) return 'S';
    if (sgpa >= 8) return 'A';
    if (sgpa >= 7) return 'B';
    if (sgpa >= 6) return 'C';
    if (sgpa >= 5) return 'D';
    if (sgpa >= 4) return 'E';
    return 'FAIL';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setStudents([...students, { ...studentData, grade: getGrade(studentData.sgpa) }]);
      setStudentData({ name: '', email: '', gender: '', semester: '', sgpa: '', courses: [] });
      setErrors({});
      
      alert('Student Registration Successful!!');
      setRegistrationSuccess(true);
      setShowTable(true);
    }
  };

  const toggleView = () => {
    setShowTable(!showTable);
    setRegistrationSuccess(false);
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Registration System</h1>
        <br></br>
        <button id='viewtable' onClick={toggleView}>
          {showTable ? 'Go to Registration Form' : 'View Registered Students'}
          
        </button>

        {!showTable ? (
          <form onSubmit={handleSubmit}>
            <br></br><br></br>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={studentData.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={studentData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label>Gender:</label>
              <input type="radio" name="gender" value="Male" checked={studentData.gender === 'Male'} onChange={handleChange} /> Male
              <input type="radio" name="gender" value="Female" checked={studentData.gender === 'Female'} onChange={handleChange} /> Female
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
            <div>
              <label>Semester:</label>
              <select name="semester" value={studentData.semester} onChange={handleChange}>
                <option value="">Select semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              {errors.semester && <p className="error">{errors.semester}</p>}
            </div>
            <div>
              <label>Extra Courses:</label>
              <label>
                <input type="checkbox" name="courses" value="Math" checked={studentData.courses.includes('Math')} onChange={handleChange} /> Math
              </label>
              <label>
                <input type="checkbox" name="courses" value="COA" checked={studentData.courses.includes('COA')} onChange={handleChange} /> COA
              </label>
              <label>
                <input type="checkbox" name="courses" value="GTLA" checked={studentData.courses.includes('GTLA')} onChange={handleChange} /> GTLA
              </label>
             
            </div>
            <div>
              <label>SGPA:</label>
              <input type="number" name="sgpa" value={studentData.sgpa} onChange={handleChange} />
              {errors.sgpa && <p className="error">{errors.sgpa}</p>}
            </div>
            <button id="sub" type="submit">Submit</button>
          </form>
        ) : (
          <div>
            {registrationSuccess && <h2 className="success-message">Registration Successful!</h2>}
            <h2>Registered Students</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Semester</th>
                  <th>Courses</th>
                  <th>SGPA</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.gender}</td>
                    <td>{student.semester}</td>
                    <td>{student.courses.join(', ')}</td>
                    <td>{student.sgpa}</td>
                    <td>{student.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </header>
      <br></br>
    </div>
   
  );
}

export default App;


