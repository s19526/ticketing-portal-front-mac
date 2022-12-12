import React,{Component} from "react";
import {Modal, Button, Row, Col, Form, FormGroup} from "react-bootstrap";

export class EditTaskModal extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"/tickets/change",{
            method:'PUT',
            headers:{
                'Authorization' : 'Basic ' + process.env.TOKEN,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id:event.target.TaskId.value,
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
                console.log('Updated a record id: ' + result.id)
            },(error)=>{
                console.log(error)
            }).catch(e=>console.log(e))
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-titled-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit TaskList
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TaskId">
                                        <Form.Label>TaskList Id</Form.Label>
                                        <Form.Control type="id" name="TaskId" required defaultValue={this.props.t?.id} disabled placeholder="TaskList Id"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskSummary">
                                        <Form.Label>TaskList Summary</Form.Label>
                                        <Form.Control type="text" name="TaskSummary" required defaultValue={this.props.t?.summary} placeholder="TaskList Summary"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskStatus">
                                        <Form.Label>TaskList Status</Form.Label>
                                        <Form.Control type="text" name="TaskStatus" required defaultValue={this.props.t?.status} placeholder="TaskList Status"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskDesc">
                                        <Form.Label>TaskList Description</Form.Label>
                                        <Form.Control type="text" name="TaskDesc" required defaultValue={this.props.t?.description} placeholder="TaskList Description"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskCreated">
                                        <Form.Label>Created at</Form.Label>
                                        <Form.Control type="text" name="TaskCreated" required defaultValue={this.props.t?.dateCreated} disabled placeholder="Created at"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="TaskSource">
                                        <Form.Label>Created through</Form.Label>
                                        <Form.Control type="text" name="TaskSource" required defaultValue={this.props.t?.source} disabled placeholder="Source"></Form.Control>
                                    </Form.Group>
                                    <FormGroup>
                                        <Button variant="primary" type="submit">
                                            Update TaskList
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
