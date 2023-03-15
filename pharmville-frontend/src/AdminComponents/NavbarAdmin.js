import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pharmvilleLogo from '../images/pharmville.png';
import '../UserComponents/NavigationBar.css';
import {NavLink} from "react-router-dom";

function NavbarAdmin() {
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
            </Container>
        </Navbar>
    );
}

export default NavbarAdmin;