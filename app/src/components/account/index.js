import React, { useState, useEffect } from 'react';
import './index.css';

const Account = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [appointments, setAppointments] = useState([]);
  let user = loggedInUser.email;

  useEffect(() => {
    fetch('http://localhost:8080/api/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data.filter(appointment => appointment.userEmail === user)))
      .catch(error => console.error('Помилка:', error));
  }, []);

  const handleDelete = async appointmentId => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setAppointments(prevAppointments => prevAppointments.filter(item => item.appointmentId !== appointmentId));
      } else {
        console.error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='accountWrap'>
      {appointments.map(item => (
        <div key={item.appointmentId} className='account'>
          <p><b>Full Name:</b> {item.doctorfullName}</p>
          <p><b>Speciality:</b> {item.doctorSpeciality}</p>
          <p><b>Time:</b> {item.bookingTimeRadio}</p>
          <p><b>Month:</b> {item.bookingMounth}</p>
          <p><b>Day:</b> {item.bookingDay}</p>
          <button onClick={() => handleDelete(item.appointmentId)} className='btn'>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Account;
