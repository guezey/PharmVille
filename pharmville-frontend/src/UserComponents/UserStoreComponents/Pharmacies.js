import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import "./Pharmacies.css";
import Medicine from './Medicine';
function Pharmacies({ pharmacies, loading }) {
    const navigate = useNavigate();

    const navigateToMedicine = () => {
        console.log("tıklandımmm")
        navigate('/medicine');
    };


    // {pharmacy.title} diyerek eriş
    if (loading) {
        return (
            <div>Loading...</div>
        );
    }
    else {
        return (
            <Row xs={4} md={4} className="g-4 medicinesHolder">
                {pharmacies.map(pharmacy => (
                    <Col>

                            <Card className='medicineHolder' onClick={navigateToMedicine}>
                                <Card.Img variant="top" className="imgHolder" src="https://picsum.photos/200/200" />
                                <Card.Body>
                                    <Card.Title>Parol</Card.Title>
                                    <Card.Text style={{ color: "rgb(30,45,47)" }}>
                                        22 TL
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                    </Col>
                ))}
            </Row>
        );
    }

}

export default Pharmacies;

