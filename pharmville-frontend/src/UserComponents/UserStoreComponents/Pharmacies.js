import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Routes, Route, useNavigate, Link, Router } from 'react-router-dom';
import "./Pharmacies.css";
import Medicine from './Medicine';
function Pharmacies({ pharmacies, loading }) {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/medicine/${id}`);
    }


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
                        <Col key={pharmacy.prod_id}>
                                <Card className='medicineHolder' onClick={() => handleClick(pharmacy.prod_id)}>
                                    <Card.Img variant="top" className="imgHolder" src="https://picsum.photos/200/200" />
                                    <Card.Body>
                                        <Card.Title>{pharmacy.name}</Card.Title>
                                        <Card.Text style={{ color: "rgb(30,45,47)" }}>
                                            {pharmacy.price} TL
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

