import React, { useState, useEffect } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Помилка:', error));
  }, []);

  return (
    <div className='doctorWrap'>
        {doctors.map(item => (
          <div key={item.id} className='doctor'  onClick={()=> navigate(`/appointments/${item.id}`)}>
            <p><b>Full Name:</b> {item.fullName}</p>
            <p><b>Age:</b> {item.age}</p>
            <p><b>Email:</b> {item.email}</p>
            <p><b>Experience:</b> {item.experience} years</p>
            <p><b>Education:</b> {item.education}</p>
            <p><b>Speciality:</b> {item.speciality}</p>
          </div>
        ))}
    </div>
  );
};

export default Doctors;