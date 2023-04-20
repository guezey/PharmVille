import React, { useState, useEffect } from 'react';

function ViewDoctorApplications() {
  const [doctorApplications, setDoctorApplications] = useState([]);

  useEffect(() => {
    // Fetch doctor applications from the system
    // Replace this
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          name: 'Dr. Dağhan Ünal',
          degree: 'Doctor of Medicine',
          status: 'pending',
        },
        {
          id: 2,
          name: 'Dr. Ceren Akyar',
          degree: 'Doctor of Medicine',
          status: 'pending',
        },
      ];
      setDoctorApplications(data);
    };

    fetchData();
  }, []);

  const handleAccept = (id) => {
    // Accept the doctor application with the given id
    console.log(`Doctor application ${id} accepted`);
  };

  const handleDecline = (id) => {
    // Decline the doctor application with the given id
    console.log(`Doctor application ${id} declined`);
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
