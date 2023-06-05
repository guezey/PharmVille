import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PrescriptionItem from './PrescriptionItem';

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/prescriptions', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setPrescriptions(data);
        console.log(data.prescriptions);
        //console.log(prescriptions);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <Container className='prescHolder'>
    <div>
      {prescriptions.length === 0 && <p>No prescriptions found!</p>}
      {prescriptions && prescriptions.length !== 0 && (
        prescriptions.prescriptions.map((prescription) => (
          <PrescriptionItem
            key={prescription.presc_id}
            id={prescription.presc_id}
            date={prescription.write_date}
            type={prescription.type}
            status={prescription.status}
            drug={prescription.medicines}
            expired={prescription.expired}
            due_date={prescription.due_date}
            diseases={prescription.diseases}
          />
        ))
      )}
    </div>
  </Container>
  );
}

export default Prescription;
