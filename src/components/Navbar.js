import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar data-bs-theme="dark" className="bg-body-tertiar bg-dark bg-opacity-50 shadow border-bottom border-dark border-opacity-10">
            <Container fluid>
                <Navbar.Brand href="/">CloudRoll</Navbar.Brand>
                {/* <Nav className="me-auto">
                    <Nav.Link href="/team">Team</Nav.Link>
                    <Nav.Link href="/tasks">Tasks</Nav.Link>
                    <Nav.Link href="/scoreboard">Scoreboard</Nav.Link>
                </Nav> */}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="/login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;