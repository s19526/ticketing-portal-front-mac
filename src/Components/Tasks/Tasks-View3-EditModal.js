import React, {Component} from "react";
import {Modal, Button, ButtonGroup} from "react-bootstrap";
import {TasksView3EditModalDetails} from "./Tasks-View3-EditModal-Details";
import {TasksView3EditModalComments} from "./Tasks-View3-EditModal-Comments";

export class TasksView3EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {details: true};
    }


    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-titled-vcenter" centered
                       backdrop={true} className="align-items-center">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            View Ticket
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ButtonGroup className="btn-group btn-reverse-main d-flex mx-4 mt-3 mb-3">
                            <Button active={this.state.details}
                                    onClick={() => this.setState(prevState => ({details: !prevState.details}))}>
                                Details
                            </Button>
                            <Button active={!this.state.details}
                                    onClick={() => this.setState(prevState => ({details: !prevState.details}))}>
                                Comments
                            </Button>
                        </ButtonGroup>
                        {this.state.details ? <TasksView3EditModalDetails t={this.props.t} onHide={this.props.onHide}/> :
                            <TasksView3EditModalComments t={this.props.t}/>}
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
}