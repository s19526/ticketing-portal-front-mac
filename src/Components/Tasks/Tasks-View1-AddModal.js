import React, {Component} from "react";
import {Modal, Button, Form} from "react-bootstrap";

export class TasksView1AddModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + "/tickets/create", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + process.env.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                summary: event.target.summControl.value,
                status: event.target.statusControl.value,
                description: event.target.descControl.value,
                source: "portal",
                author: {"id": JSON.parse(sessionStorage.getItem("user")).id},
                dateCreated: Date.now()
                })
        })
            .then(res => res.json())
            .then(result => {
                console.log('Created the new record ' + result.id)
                this.props.onHide();
            }, (error) => {
                console.log(error)
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-titled-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new Ticket
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="mx-4" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" variant="m-4" controlId="summControl">
                                <Form.Label>Summary</Form.Label>
                                <Form.Control type="text" name="summControl" required
                                              placeholder="Ticket Summary"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="statusControl" defaultValue="Created">
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="statusControl">
                                    <option value="Created">Created</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Reopened">Reopened</option>
                                </Form.Select> </Form.Group>
                            <Form.Group className="mb-3" controlId="descControl">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={6} name="descControl" required></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3 text-center">
                                <Button variant="btn btn-success btn-md" type="submit">
                                    Add new
                                </Button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

}

//<Modal.Footer>
//                         <Button variant="danger btn btn-md" onClick={this.props.onHide}>Close</Button>
//                     </Modal.Footer>