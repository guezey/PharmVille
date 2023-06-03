import React from "react";

const Logout = ({onLogout}) => {
    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        onLogout();
    };
  
    return (
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
    );
};

export default Logout;
