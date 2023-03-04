import Container from 'react-bootstrap/Container';
import PrescriptionItem from './PrescriptionItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const prescriptions = [
  {
    id: 1,
    date: '11/02/23',
    type: 'red',
    status: 'active' ,
    drug: ['Paroksetin']  ,
  },
  {
    id: 2,
    date: '07/01/23',
    type: 'normal',
    status: 'expired' ,
    drug: ['Nexium', 'Gaviscon'] ,
  },
  {
    id: 3,
    date: '19/11/22',
    type: 'normal',
    status: 'used' ,
    drug: 
      ['Parol', 'Iburofen', 'Desiferol']
  },
];

function Prescription() {
    return (
     <Container>
      <Row>
        <Col xs={8}>
          <div>
          {prescriptions.map((prescription) => 
          <PrescriptionItem id = {prescription.id}
            date={prescription.date} type={prescription.type}
            status={prescription.status} drug={prescription.drug}></PrescriptionItem>
            )}
          </div>
        </Col>
      </Row>
     </Container>
    );
  }
  
  export default Prescription;