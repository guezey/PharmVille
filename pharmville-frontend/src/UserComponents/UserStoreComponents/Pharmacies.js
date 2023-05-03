import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Pharmacies.css";
function Pharmacies({ pharmacies, loading }) {
    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    else {
        return (
                <Row>
                    {pharmacies.map(pharmacy => (
                            <div className='pharmacyHolder'>
                                <Row>
                                    <Col>
                                        <img src="https://picsum.photos/200/200" className='imgHolder'></img>
                                    </Col>
                                    <Col>
                                        <h1>{pharmacy.title}</h1>
                                        <p></p>
                                    </Col>
                                </Row>
                            </div>
                    ))}
                </Row>
        );
    }

}

export default Pharmacies;