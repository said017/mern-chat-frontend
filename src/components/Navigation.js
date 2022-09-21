import React from "react";
import { useState, useEffect } from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo-ciri-white-nobg.png";
function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);

    if (value.length) {
      const element = document.getElementById(value.substring(1));
      if (element) {
        element.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <LinkContainer to="/#">
          <Navbar.Brand onClick={() => onUpdateActiveLink("#")}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 50, height: 50, marginRight: 10 }}
            />{" "}
            <span>Ciriverse</span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"> </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer
                to="/#how-it-works"
                className={
                  activeLink === "#how-it-works"
                    ? "active navbar-link"
                    : "navbar-link"
                }
              >
                <Nav.Link onClick={() => onUpdateActiveLink("#how-it-works")}>
                  How It Works
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/#why-ciri">
              <Nav.Link
                className={
                  activeLink === "#why-ciri"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("#why-ciri")}
              >
                Why Ciri
              </Nav.Link>
            </LinkContainer>
            <span className="navbar-text">
              {/* <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div> */}
              <LinkContainer to="/connect">
                <button className="vvd">
                  <span>Let’s Connect</span>
                </button>
              </LinkContainer>
            </span>
            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item> */}

                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
