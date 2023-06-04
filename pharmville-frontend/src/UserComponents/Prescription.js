import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import PrescriptionItem from './PrescriptionItem';

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  /** 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/prescriptions');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  */
 
  return (
    <Container className='prescHolder'>
      <div>
        {prescriptions.map((prescription) => 
          <PrescriptionItem
            key={prescription.id}
            id={prescription.id}
            date={prescription.date}
            type={prescription.type}
            status={prescription.status}
            drug={prescription.drug}
            expired={prescription.expired}
          />
        )}
      </div>
    </Container>
  );
}

export default Prescription;
