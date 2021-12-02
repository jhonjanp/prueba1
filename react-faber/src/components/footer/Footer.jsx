import React from 'react';
import '../.././App.css';
import { Navbar, Nav, Container} from 'react-bootstrap';

function Footer(){
    return (
	<>
		<footer className="footer">
			<Navbar>
				<Container>
					<Navbar.Brand href="#home">OpinandoAndo</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link href="#home">Integrantes: Jhonjan Dario portilla , Faber andres Yela </Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</footer>
	</>
    )
}

export default Footer;