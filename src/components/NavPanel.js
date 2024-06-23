import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { DataContext } from "../DataContext.js";

function NavPanel() {
  const data = useContext(DataContext);
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="./index.html" className="nav-title">{data.title}</Navbar.Brand>
          <Nav className="me-auto">
            {data.menus.map((v) => {
              return (
                <Nav.Link as={Link} key={v.key} to={v.href} className="menuitem">
                  {v.text}
                </Nav.Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavPanel;
