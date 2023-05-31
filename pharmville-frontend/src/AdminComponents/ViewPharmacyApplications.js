import React, { useState, useEffect } from 'react';

function ViewPharmacyApplications() {
  const [pharmacyApplications, setPharmacyApplications] = useState([]);

  useEffect(() => {
    // Fetch pharmacy applications from the system
    fetch('http://localhost:5000/api/pharmacy_applications', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => setPharmacyApplications(data))
    .catch(error => console.error('Error:', error));
  }, []);

  const handleAccept = (id) => {
    // Accept the pharmacy application with the given id
    fetch(`http://localhost:5000/api/pharmacy_applications/${id}/accept`, {
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        // Refresh the pharmacy applications
        return fetch('http://localhost:5000/api/pharmacy_applications', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => setPharmacyApplications(data))
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleDecline = (id) => {
    // Decline the pharmacy application with the given id
    fetch(`http://localhost:5000/api/pharmacy_applications/${id}/decline`, {
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        // Refresh the pharmacy applications
        return fetch('http://localhost:5000/api/pharmacy_applications', {
          method: 'GET',
        })
        .then(response => response.json())
        .then(data => setPharmacyApplications(data))
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>View Pharmacy Applications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>License</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacyApplications.map((application) => (
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

export default ViewPharmacyApplications;
