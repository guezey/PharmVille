import React from 'react';

const Prescriptions = ({ prescriptions }) => {
  return (
    <div className="prescriptions">
      <h2>Prescriptions</h2>
      <ul style={{color:"black"}}>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            {prescription.medication} ({prescription.dose}) - {prescription.frequency} - {prescription.startDate} to {prescription.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prescriptions;
