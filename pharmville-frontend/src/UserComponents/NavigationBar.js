import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import pharmvilleLogo from "../images/pharmville.png";
import searchIcon from "../images/search-icon.png";
import "./NavigationBar.css";
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useNavigate} from 'react-router-dom';

function NavigationBar() {

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    window.location.reload(); // To force an immediate refresh of the page.
  };

  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(searchText);
    navigate(`/${searchText}`);
    window.location.reload();
  };


  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to={"/"} className="color-p">
          <img
            alt=""
            src={pharmvilleLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          PharmVille
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={"/"} className="color-p">
              Store
            </Nav.Link>
          </Nav>
          <Container className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="Search for medicine"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
            <img src={searchIcon} className="iconImg" onClick={handleSearch}></img>
          </Container>
          <Nav>
            <Nav.Link as={NavLink} to={"/prescriptions"} className="color-p">
              Prescriptions
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/profile"} className="color-p">
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/cart"} className="color-p">
              Cart
            </Nav.Link>
            
          </Nav>
          <Logout onLogout={handleLogout} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
