import React from 'react'
import {Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap'

class ModalItem extends React.Component{
    


    handleSubmit = (e) => {
        let noteId = ""
        noteId = document.getElementById("currentNoteId").innerHTML
        const todo = e.target.TodoName.value
        e.preventDefault()
        this.props.editItem(todo, noteId)
        this.props.showAlert()
    }
    render(){
        
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose} >
                                    <Modal.Header closeButton>Edit Todo</Modal.Header>
                                    <Modal.Body>
                                        <Row>
                                            <Col sm={6}>
                                                <Form onSubmit={this.handleSubmit}>
                                                <Form.Group controlId="TodoName" >
                                                    <Form.Label>Re-enter Todo</Form.Label>
                                                    <Form.Control maxLength="15" type="text" name="TodoName" required placeholder="Edit todo here" />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Button variant="primary" type="submit">Rename</Button>
                                                </Form.Group>
                                                </Form>
                                                <p hidden id="currentNoteId">{this.props.itemid}</p>
                                                <Alert show={this.props.alert} className="text-center" variant="success">
                                                    Todo is updated
                                                </Alert>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick ={ this.props.handleClose }>Close</Button>
                                    </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalItem