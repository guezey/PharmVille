import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pharmvilleLogo from '../images/pharmville.jpg';
import './NavigationBar.css';
import {NavLink} from "react-router-dom";

function NavigationBar() {
    return (
        <Navbar className="color-nav" collapseOnSelect expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand as={NavLink} to={"/"} className='color-p'><img
                    alt=""
                    src={pharmvilleLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}PharmVille</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={"/"} className='color-p'>Store</Nav.Link>
                    </Nav>
                    <Container className='search'>
                        <input type="text" class="searchTerm" placeholder="Search for pharmacy or medicine"></input>
                        <button type="submit" class="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </Container>
                    <Nav>
                        <Nav.Link as={NavLink} to={"/prescriptions"} className='color-p'>Prescriptions</Nav.Link>
                        <Nav.Link as={NavLink} to={"/profile"} className='color-p'>Profile</Nav.Link>
                        <Nav.Link as={NavLink} to={"/cart"} className='color-p'>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;