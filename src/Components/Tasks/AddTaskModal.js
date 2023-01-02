import React,{Component} from "react";
import {Modal, Button, Row, Col, Form, FormGroup} from "react-bootstrap";

export class AddTaskModal extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"/tickets/create",{
            method:'POST',
            headers:{
                'Authorization' : 'Basic ' + process.env.TOKEN,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                summary:event.target.summControl.value,
                status:event.target.statusControl.value,
                description:event.target.descControl.value,
                source:"portal",
                dateCreated:Date.now(),
                author:{"id":1}

            })
        })
            .then(res=>res.json())
            .then(result=>{
                console.log('Created the new record ' + result.id)
            },(error)=>{
                console.log(error)
            })
            .catch(e=>console.log(e))
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
                                        <Form.Control type="text" name="summControl" required placeholder="Ticket Summary"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="statusControl">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control type="text" name="statusControl" required placeholder="Ticket Status"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="descControl">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={6} name="descControl" required></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-center">
                                        <Button variant="btn btn-success btn-md" type="submit" onSubmit={this.props.onHide}>
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