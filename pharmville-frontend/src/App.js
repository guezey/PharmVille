import NavigationBar from "./UserComponents/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarDoctor from "./DoctorComponents/NavbarDoctor";
import MainPageDoctor from "./DoctorComponents/MainPageDoctor";
import NavbarPharmacy from "./PharmacyComponents/NavbarPharmacy";
import Deliveries from "./PharmacyComponents/Deliveries";
import SystemReports from "./PharmacyComponents/SystemReports";
import MyShop from "./PharmacyComponents/MyShop";
import NavbarAdmin from "./AdminComponents/NavbarAdmin";
import MainPageAdmin from "./AdminComponents/MainPageAdmin";
import {
  BrowserRouter as Router, Routes,
  Route,
} from "react-router-dom";
import Store from "./UserComponents/UserStoreComponents/Store";
import PatientProfile from "./Profile/PatientProfile";
import DoctorProfile from "./Profile/DoctorProfile";
import Prescription from "./UserComponents/Prescription";
import Medicine from "./UserComponents/UserStoreComponents/Medicine";
import Cart from "./UserComponents/Cart";
import Login from "./UserComponents/Login";
import React, { useState, useEffect } from "react";
import PharmacyProfile from "./Profile/PharmacyProfile";
import Reviews from "./UserComponents/UserStoreComponents/Reviews";
import PharmacyStorePage from "./UserComponents/UserStoreComponents/PharmacyStorePage";
function App() {

  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userData, setUserData] = useState(localStorage.getItem("userData"));

  const handleLogin = (role, data) => {
    setUserRole(role);
    setUserData(data);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key === "userRole") {
        setUserRole(e.newValue);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  switch (userRole) {
    case "Patient":
      return (
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/*" element={<Store />} />
          <Route path='/prescriptions' element={<Prescription />} />
          <Route path='/profile' element={<PatientProfile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path={'/medicine/:id'} element={<Medicine />} />
          <Route path={'/review/:id'} element={<Reviews />} />
          <Route path={'/pharmacyStore/:id'} element={<PharmacyStorePage />} />
          <Route path={'/:searcText'} element={<Store />} />
        </Routes>
      </Router>
    );
    case "Doctor":
      return (
        <Router>
          <NavbarDoctor />
          <Routes>
            <Route path="/" element={<MainPageDoctor />} />
            <Route path='/profile' element={<DoctorProfile />} />
          </Routes>
        </Router>
      );
    case "Pharmacy":
      return (
        <Router>
          <NavbarPharmacy />
          <Routes>
            <Route path="/*" element={<PharmacyProfile />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/reports" element={<SystemReports />} />
            <Route path='/profile' element={<DoctorProfile />} />
          </Routes>
        </Router>
      );
    case "Admin":
      return (
        <Router>
          <NavbarAdmin />
          <Routes>
            <Route path="/" element={<MainPageAdmin />} />
          </Routes>
        </Router>
      );
    default:
      console.error("Invalid user role.");
      return <Login />;
  }

}

export default App;
