import { Fragment } from "react"
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
    return (
        <Fragment>
            <Navbar bg="light" expand="lg" fixed="top" >
                <div className="container-fluid">
                    <Navbar.Brand href="#home">
                        <img src="Assets/Images/logo.svg" alt="Logo Saúde UNASP" width="50" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#sessaoCalculoIMC">IMC</Nav.Link>
                            <Nav.Link href="#sessaoCadastro">Cadastro</Nav.Link>
                            <Nav.Link href="#sessaoSobreNos">Sobre nós</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </Fragment>
    )
}

export default Menu