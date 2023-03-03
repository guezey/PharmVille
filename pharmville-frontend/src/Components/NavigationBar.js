import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import pharmvilleLogo from '../images/pharmville.jpg';
import './NavigationBar.css';

function NavigationBar() {
    return (
        <Navbar className="color-nav" collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home"><img
              alt=""
              src={pharmvilleLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}PharmVille</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Store</Nav.Link>
              </Nav>
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              
            />
            <Button variant="outline-success">Search</Button>
          </Form>
              <Nav>
                <Nav.Link href="#deets">Prescriptions</Nav.Link>
                <Nav.Link href="#memes">
                  Profile
                </Nav.Link>
                <Nav.Link href="#deets">Cart</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavigationBar;