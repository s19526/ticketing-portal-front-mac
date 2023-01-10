import React,{Component} from "react";
import {Modal, Button, Form} from "react-bootstrap";

export class TasksEditModal extends Component{
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
                                <Form className="mx-4" onSubmit={this.handleSubmit}>
                                    <Form.Group className="mb-3" controlId="TaskId">
                                        <Form.Label>Ticket Id</Form.Label>
                                        <Form.Control type="id" name="TaskId" required defaultValue={this.props.t?.id} disabled placeholder="TaskList Id"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="TaskSummary">
                                        <Form.Label>Ticket Summary</Form.Label>
                                        <Form.Control type="text" name="TaskSummary" autoFocus required defaultValue={this.props.t?.summary} placeholder="TaskList Summary"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="TaskStatus">
                                        <Form.Label>Ticket Status Status</Form.Label>
                                        <Form.Control type="text" name="TaskStatus" required defaultValue={this.props.t?.status} placeholder="TaskList Status"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="TaskDesc">
                                        <Form.Label>Ticket Description</Form.Label>
                                        <Form.Control as="textarea" rows={6} name="TaskDesc" required defaultValue={this.props.t?.description} placeholder="TaskList Description"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="TaskCreated">
                                        <Form.Label>Created at</Form.Label>
                                        <Form.Control type="text" name="TaskCreated" required defaultValue={this.props.t?.dateCreated} disabled placeholder="Created at"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="TaskSource">
                                        <Form.Label>Created from</Form.Label>
                                        <Form.Control type="text" name="TaskSource" required defaultValue={this.props.t?.source} disabled placeholder="Source"></Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-3 text-center">
                                        <Button variant="btn btn-success btn-md" type="submit" onClick={this.props.onHide}>
                                            Update Ticket
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