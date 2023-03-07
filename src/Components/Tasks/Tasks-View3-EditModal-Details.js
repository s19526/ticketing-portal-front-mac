import {Button, Form, ProgressBar} from "react-bootstrap";
import React, {Component} from "react";


export class TasksView3EditModalDetails extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + "/tickets/change", {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + process.env.TOKEN,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.TaskId.value,
                summary: event.target.TaskSummary.value,
                status: event.target.TaskStatus.value,
                description: event.target.TaskDesc.value,
                source: "portal",
                dateCreated: Date.now(),
                author: {"id": 1}
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log('Updated a record id: ' + result.id);
                this.props.onHide();
            }, (error) => {
                console.log(error)
            }).catch(e => console.log(e))
    }


    render() {
        return (
            <Form className="mx-4" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="TaskId">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="id" name="TaskId" required defaultValue={this.props.t?.id} disabled
                                  placeholder="TaskList Id"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskSummary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control type="text" name="TaskSummary" autoFocus required defaultValue={this.props.t?.summary}
                                  placeholder="TaskList Summary"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskStatus">
                    <Form.Label>Status</Form.Label>
                    <ProgressBar id="progressBar" className="mb-3 fw-bold progress" striped
                                 variant={this.statusVariant()} min={0} max={4} now={this.statusValue()}
                                 label={this.props.t?.status}></ProgressBar>
                    <Form.Select name="TaskStatus" defaultValue={this.props.t?.status}>
                        <option value="Created">Created</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                        <option value="Reopened">Reopened</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskDesc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="TaskDesc" required
                                  defaultValue={this.props.t?.description}
                                  placeholder="TaskList Description"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskCreated">
                    <Form.Label>Created at</Form.Label>
                    <Form.Control type="text" name="TaskCreated" required defaultValue={this.props.t?.dateCreated}
                                  disabled placeholder="Created at"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="TaskSource">
                    <Form.Label>Created from</Form.Label>
                    <Form.Control type="text" name="TaskSource" required defaultValue={this.props.t?.source} disabled
                                  placeholder="Source"></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Button variant="btn btn-success btn-md" type="submit">
                        Update Ticket
                    </Button>
                </Form.Group>
            </Form>)
    }


    statusValue() {
        switch (this.props.t?.status) {
            case "Created":
                return 1;
            case "In Progress":
                return 2;
            case "Resolved":
                return 3;
            case "Closed":
                return 4;
            case "Reopened":
                return 1;
        }
    }

    statusVariant() {
        switch (this.props.t?.status) {
            case "Created":
                return "warning";
            case "In Progress":
                return "success";
            case "Resolved":
                return "info";
            case "Closed":
                return "";
            case "Reopened":
                return "warning";
        }
    }
}