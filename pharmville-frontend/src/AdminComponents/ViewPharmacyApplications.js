import React, { useState, useEffect } from 'react';

function ViewPharmacyApplications() {
  const [pharmacyApplications, setPharmacyApplications] = useState([]);

  useEffect(() => {
    // Fetch pharmacy applications from the system
    // Replace this
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          name: 'Pharmacy Faruk',
          license: '123456789',
          status: 'pending',
        },
        {
          id: 2,
          name: 'Pharmacy Ahmet',
          license: '987654321',
          status: 'pending',
        },
      ];
      setPharmacyApplications(data);
    };

    fetchData();
  }, []);

  const handleAccept = (id) => {
    // Accept the pharmacy application with the given id
    console.log(`Pharmacy application ${id} accepted`);
  };

  const handleDecline = (id) => {
    // Decline the pharmacy application with the given id
    console.log(`Pharmacy application ${id} declined`);
  };

  return (
    <div>
      <h2>View Pharmacy Applications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>License</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacyApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.name}</td>
              <td>{application.license}</td>
              <td>{application.status}</td>
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
