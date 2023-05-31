import React, { useState, useEffect } from 'react';

function ViewDoctorApplications() {
  const [doctorApplications, setDoctorApplications] = useState([]);

  useEffect(() => {
    // Fetch doctor applications from the system
    fetch('http://localhost:5000/api/doctor_applications', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => setDoctorApplications(data))
    .catch(error => console.error('Error:', error));
  }, []);

  const handleAccept = (id) => {
    // Accept the doctor application with the given id
    fetch(`http://localhost:5000/api/doctor_applications/${id}/accept`, {
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        // Refresh the doctor applications
        return fetch('http://localhost:5000/api/doctor_applications', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => setDoctorApplications(data))
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleDecline = (id) => {
    // Decline the doctor application with the given id
    fetch(`http://localhost:5000/api/doctor_applications/${id}/decline`, {
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        // Refresh the doctor applications
        return fetch('http://localhost:5000/api/doctor_applications', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => setDoctorApplications(data))
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>View Doctor Applications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Diploma</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctorApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.name}</td>
              <td>{application.status}</td>
              <td>
                <button>View</button>
              </td>
              <td>
                <button onClick={() => handleAccept(application.id)}>Accept</button>
                <button onClick={() => handleDecline(application.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewDoctorApplications;
