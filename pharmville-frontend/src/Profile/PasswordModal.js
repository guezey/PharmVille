import React, { useState } from 'react';

const PasswordModal = ({ isOpen, onClose, onChangePassword, currentPassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (oldPassword !== currentPassword) {
      setError('Incorrect old password');
    } else if (newPassword !== confirmNewPassword) {
      setError("New passwords don't match");
    } else {
      onChangePassword(newPassword);
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="password-modal">
      <div className="modal-content">
        <h2>Change Password</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <button onClick={handleSubmit}>Change Password</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PasswordModal;
