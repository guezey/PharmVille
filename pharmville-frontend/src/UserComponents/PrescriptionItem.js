import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import "./Prescription.css";
import { useState } from 'react';
function PrescriptionItem(props) {

    const [openDetails, setOpenDetails] = useState(false);

    const getDetails = () => {
        setOpenDetails(!openDetails);
    }

    return (
        <div><Container className='itemHolder'>
            <Row>
                <Col className='borders'><h1>Date</h1> <p>{props.date}</p></Col>
                <Col className='borders'><h1>Prescription ID</h1><p>{props.id}</p></Col>
                <Col className='borders'><h1>Type</h1><p>{props.type}</p></Col>
                <Col>
                    <h1>Status</h1><p>{props.status}</p>
                    <div className='button-holder'>
                        <button className='detailsButton' onClick={getDetails}>Details</button>
                    </div>
                </Col>
            </Row>
            
        </Container>
        {openDetails && <Container className='detailsHolder'>
            <Row>
                <Col><h1>Expire Date: {props.expired}</h1></Col>
            </Row>
            <Row>
                <ul>
                {props.drug.map( (medicine) => 
                <li>{medicine}</li>) }
                </ul>
                </Row>    
                </Container>}
</div>
        
    );
}

export default PrescriptionItem;