import React from 'react';

const MedicineHistory = ({ medicineHistory }) => {
  return (
    <div className="medicine-history">
      <h2>Medicine History</h2>
      <ul style={{color:"black"}}>
        {medicineHistory.map((medicine) => (
          <li key={medicine.id}>
            {medicine.name} ({medicine.dose}) - {medicine.startDate} to {medicine.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineHistory;
