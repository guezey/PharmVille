import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pharmvilleLogo from '../images/pharmville.jpg';
import './NavigationBar.css';

function NavigationBar() {
    return (
        <Navbar className="color-nav" collapseOnSelect expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand href="#home" className='color-p'><img
                    alt=""
                    src={pharmvilleLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}PharmVille</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features" className='color-p'>Store</Nav.Link>
                    </Nav>
                    <Container className='search'>
                        <input type="text" class="searchTerm" placeholder="What are you looking for?"></input>
                        <button type="submit" class="searchButton">
                            <i class="fa fa-search"></i>
                        </button>
                    </Container>
                    <Nav>
                        <Nav.Link href="#deets" className='color-p'>Prescriptions</Nav.Link>
                        <Nav.Link href="#memes" className='color-p'>
                            Profile
                        </Nav.Link>
                        <Nav.Link href="#deets" className='color-p'>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;