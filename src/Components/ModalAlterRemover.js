import { Fragment, React, Component } from "react"
import { Button, Modal} from 'react-bootstrap'
import Cadastro from "../Pages/Cadastro"
import CadastroApi from "../Services/CadastroApi"


class ModalAlterarRemover extends Component{

    constructor(props) {
        super(props)
        this.state = {show: false, title: "", body: "", documento: ""}
    }

    handleClose = () => this.setState({show: false, title: "", body: "", documento: ""})
    handleShow = modal => this.setState( modal )

    excluirDocumento = () =>{
        CadastroApi.deletarCadastro(this.state.documento)
        .then( response => {
            console.log(response)
        })
    }

    render() {
        const {show, title, body} = this.state

        return (
            <Fragment>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body}
                        <Button onClick={this.handleClose}>Alterar</Button>
                        <Button onClick={this.excluirDocumento}>Remover</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

export default ModalAlterarRemover