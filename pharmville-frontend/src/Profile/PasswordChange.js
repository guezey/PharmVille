import React, { useState, useEffect } from 'react';
import PasswordModal from './PasswordModal';

const PasswordChange = ({ setPatientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    const fetchPassword = async () => {
      let response = await fetch('http://localhost:5000/api/patientPassword');
      let data = await response.json();
      setCurrentPassword(data.password);
    };
    fetchPassword();
  }, []);

  const handleChangePassword = (newPassword) => {
    setPatientData((prevState) => ({ ...prevState, password: newPassword }));
    const updatePassword = async () => {
      await fetch('http://localhost:5000/api/updatePatientPassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
    };
    updatePassword();
  };

  return (
    <div className="password-change">
      <h2>Change Password</h2>
      <button onClick={() => setIsModalOpen(true)}>Change Password</button>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChangePassword={handleChangePassword}
        currentPassword={currentPassword}
      />
    </div>
  );
};

export default PasswordChange;
