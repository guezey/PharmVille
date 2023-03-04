import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Prescription.css";
function PrescriptionItem(props) {
    return (
        <div>
            <Row className='itemHolder'>
                <Col className='borders'><h1>Date</h1> <p>{props.date}</p></Col>
                <Col className='borders'><h1>Prescription ID</h1><p>{props.id}</p></Col>
                <Col className='borders'><h1>Type</h1><p>{props.type}</p></Col>
                <Col className='borders'><h1>Status</h1><p>{props.status}</p></Col>
            </Row>
            <Row>
                <button>Details</button>
            </Row>
        </div>

    );
}

export default PrescriptionItem;