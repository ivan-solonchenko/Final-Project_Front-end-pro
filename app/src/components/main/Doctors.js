import React, { useState, useEffect } from 'react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Помилка:', error));
  }, []);

  return (
    <div>
      <h2>Дані з doctors.json:</h2>
      <ul>
        {doctors.map(item => (
          <li key={item.id}>
            <p>Ім'я: {item.Name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
