import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LinkStyle = {
  marginRight: "15px",
};

function BasicExample() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to="/">
          Social Connect
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Link to="/home" style={LinkStyle} className="nav-link">
                  Home
                </Link>
                <Link to="/profile" style={LinkStyle} className="nav-link">
                  My Posts
                </Link>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Link
                    to="/create"
                    style={LinkStyle}
                    className="dropdown-item"
                  >
                    Create new post
                  </Link>
                  <Link
                    to="/settings"
                    style={LinkStyle}
                    className="dropdown-item"
                  >
                    Settings
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={handleClick}
                  >
                    Logout
                  </Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/login" style={LinkStyle} className="nav-link">
                  Login
                </Link>
                <Link to="/register" style={LinkStyle} className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
