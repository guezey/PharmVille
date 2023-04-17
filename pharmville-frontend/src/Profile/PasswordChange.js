import React, { useState } from 'react';
import PasswordModal from './PasswordModal';

const PasswordChange = ({ setPatientData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePassword = (newPassword) => {
    setPatientData((prevState) => ({ ...prevState, password: newPassword }));
  };

  return (
    <div className="password-change">
      <h2>Change Password</h2>
      <button onClick={() => setIsModalOpen(true)}>Change Password</button>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChangePassword={handleChangePassword}
        currentPassword="password123" // Replace this with the actual current password
      />
    </div>
  );
};

export default PasswordChange;
