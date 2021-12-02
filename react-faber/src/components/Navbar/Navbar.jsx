import React from "react";
import '../.././App.css';
import {Navbar, Nav, Container} from "react-bootstrap";
import { Link} from "react-router-dom";



function NavBar(){
  return (
      <Navbar className="navegacion">
          <Container>
              <Link to='/'>
                <img src='./pensamiento.png' width='50px'/>
                <Navbar.Brand href="/">OpinandoAndo</Navbar.Brand>
              </Link>

              <Nav className="mx-auto">



                <Link to='/encuestas'>
                  <Nav.Link href="#Encuestas">Encuestas</Nav.Link>
                </Link>

                <Link to='/usuarios'>
                  <Nav.Link href="#Usuarios">Usuarios</Nav.Link>
                </Link>

                <Link to='/secciones'>
                  <Nav.Link href="#Secciones">Secciones</Nav.Link>
                </Link>

                <Link to='/preguntas'>
                  <Nav.Link href="#Preguntas">Preguntas</Nav.Link>
                </Link>

                

              </Nav>
                <Link className="Logueo" to='/login'>
                  <Nav.Link href="#Login">Inicia sesión</Nav.Link>
                </Link>
          </Container>
    </Navbar>
  );
};

export default NavBar;