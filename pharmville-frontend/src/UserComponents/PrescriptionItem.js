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
        <div>
            <div className='itemHolder'>
                <Row>
                    <Col className='borders'><h1 className='presch1'>Given Date</h1> <p className='prescPar'>{props.date}</p></Col>
                    <Col className='borders'><h1 className='presch1'>Prescription ID</h1><p className='prescPar'>{props.id}</p></Col>
                    <Col className='borders'><h1 className='presch1'>Type</h1><p className='prescPar'>{props.type}</p></Col>
                    <Col>
                        <h1 className='presch1'>Status</h1><p className='prescPar'>{props.status}</p>
                        <div className='button-holder'>
                            <button className='detailsButton' onClick={getDetails}>Details</button>
                        </div>
                    </Col>
                </Row>

            </div>
            <div>
                {openDetails &&
                    <div className='detailsHolder'>
                        <div className='drugNamesList'>
                            <h1 className='prescParLeft'>Expire Date: {props.due_date}</h1>
                            {props.drug.map((medicine) =>
                                <div className='drugDescList'>
                                    <div style={{ width: '100px' }}><p className='prescLi'>{medicine.name}</p></div>
                                    <div style={{ width: '100px' }}><p className='prescLi'>x{medicine.box_count}</p></div>
                                    <div style={{ width: '150px' }}><p className='prescLi'>Dosage: {medicine.dosage}</p></div>
                                    <div style={{ width: '300px' }}> <p className='prescLi'>{medicine.description}</p></div>
                                </div>)}
                        </div>
                        <div>
                            <p className='prescParLeft'>Causes for Prescription: {
                                props.diseases.map((cause) => " " + cause.name + ", ")
                            }</p>
                        </div>
                    </div>}
            </div>

        </div>

    );
}

export default PrescriptionItem;