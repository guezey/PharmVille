import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    healthCondition: '',
    medicineHistory: [],
    balance: 0
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const { name, surname, healthCondition, medicineHistory, balance } = userData;
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>Surname: {surname}</p>
      <p>Health Condition: {healthCondition}</p>
      <p>Medicine History: {medicineHistory.join(', ')}</p>
      <p>Balance: ${balance.toFixed(2)}</p>

      <div>
        <h2>Account Settings</h2>
        <button onClick={() => alert("Password change functionality not implemented")}>
          Change Password
        </button>
        <button onClick={() => alert("Add balance functionality not implemented")}>
          Add Balance
        </button>
      </div>
    </div>
  );
}

export default Profile;
