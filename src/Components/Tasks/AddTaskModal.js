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
                summary:event.target.TaskSummary.value,
                status:event.target.TaskStatus.value,
                description:event.target.TaskDesc.value,
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
                        <Modal.Title id="cotained-modal-title-vcenter">
                            Add TaskList
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TaskSummary">
                                        <Form.Label>TaskList Summary</Form.Label>
                                        <Form.Control type="text" name="TaskSummary" required placeholder="TaskList Summary"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskStatus">
                                        <Form.Label>TaskList Summary</Form.Label>
                                        <Form.Control type="text" name="TaskStatus" required placeholder="TaskList Status"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskDesc">
                                        <Form.Label>TaskList Summary</Form.Label>
                                        <Form.Control type="text" name="TaskDesc" required placeholder="TaskList Description"></Form.Control>
                                    </Form.Group>
                                <FormGroup>
                                    <Button variant="primary" type="submit">
                                        Add new TaskList
                                    </Button>
                                </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}
