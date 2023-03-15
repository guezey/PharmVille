import Container from 'react-bootstrap/Container';
import PrescriptionItem from './PrescriptionItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const prescriptions = [
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
  {
    key: 2,
    id: 16980075623,
    date: '07/01/23',
    type: 'Normal',
    status: 'Expired' ,
    expired: '14/02/23',
    drug: ['Nexium', 'Gaviscon'] ,
  },
  {
    key: 3,
    id: 123446742,
    date: '19/11/22',
    type: 'Normal',
    status: 'Used' ,
    expired: '14/02/23',
    drug: 
      ['Parol', 'Iburofen', 'Desiferol']
  },
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
  {
    key: 1,
    id: 1238632,
    date: '11/02/23',
    type: 'Red',
    status: 'Active' ,
    expired: '14/02/23',
    drug: ['Paroksetin']  ,
  },
];

function Prescription() {

    return (
     <Container className='prescHolder'>
          <div>
          {prescriptions.map((prescription) => 
          <PrescriptionItem id= {prescription.id}
            date={prescription.date} type={prescription.type}
            status={prescription.status} drug={prescription.drug} expired={prescription.expired}>
            </PrescriptionItem>
            )}
          </div>
     </Container>
    );
  }
  
  export default Prescription;