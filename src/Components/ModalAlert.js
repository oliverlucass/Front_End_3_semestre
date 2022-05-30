import { Fragment, React, Component } from "react"
import { Button, Modal} from 'react-bootstrap'


class ModalAlert extends Component{

    constructor(props) {
        super(props)
        this.state = {show: false, title: "", body: ""}
    }

    handleClose = () => this.setState({show: false, title: "", body: "" })
    handleShow = modal => this.setState( modal )

    render() {
        const {show, title, body} = this.state

        return (
            <Fragment>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
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

export default ModalAlert