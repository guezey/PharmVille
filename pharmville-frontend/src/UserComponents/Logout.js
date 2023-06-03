import React from 'react';

const Logout = ({ onLogout }) => (
  <button onClick={onLogout} className="logout-button">
    Logout
  </button>
);

export default Logout;
