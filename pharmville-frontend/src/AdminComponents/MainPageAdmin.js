import React, { useState } from 'react';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import ViewDoctorApplications from './ViewDoctorApplications';
import ViewPharmacyApplications from './ViewPharmacyApplications';
import "./AdminPage.css";

function MainPageAdmin() {
  const [option, setOption] = useState('');

  const renderOption = () => {
    switch (option) {
      case 'addProduct':
        return <AddProduct />;
      case 'deleteProduct':
        return <DeleteProduct />;
      case 'updateProduct':
        return <UpdateProduct />;
      case 'viewDoctorApplications':
        return <ViewDoctorApplications />;
      case 'viewPharmacyApplications':
        return <ViewPharmacyApplications />;
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setOption('addProduct')}>Add Product To The System</button>
        <button onClick={() => setOption('deleteProduct')}>Delete Product From The System</button>
        <button onClick={() => setOption('updateProduct')}>Update Product Information</button>
        <button onClick={() => setOption('viewDoctorApplications')}>View Doctor Applications</button>
        <button onClick={() => setOption('viewPharmacyApplications')}>View Pharmacy Application</button>
      </div>
      {renderOption()}
    </div>
  );
}

export default MainPageAdmin;
