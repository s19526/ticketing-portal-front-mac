import React, {Component} from "react";
import {Modal, Button, ButtonGroup} from "react-bootstrap";
import {AgentView3EditModalDetails} from "./Agent-View3-EditModal-Details";
import {AgentView3EditModalComments} from "./Agent-View3-EditModal-Comments";
import {AgentView3EditModalHistory} from "./Agent-View3-EditModal-History";

export class AgentView3EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {details: 0};
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
                            <Button active={this.state.details==0}
                                    onClick={() => this.setState({details:0})}>
                                Details
                            </Button>
                            <Button active={this.state.details==1}
                                    onClick={() => this.setState({details:1})}>
                                Comments
                            </Button>
                            <Button active={this.state.details==2}
                                    onClick={() => this.setState({details:2})}>
                                History
                            </Button>
                        </ButtonGroup>
                        {this.state.details==0 ? <AgentView3EditModalDetails t={this.props.t} onHide={this.props.onHide}/> : this.state.details==1 ?
                            <AgentView3EditModalComments t={this.props.t}/>:<AgentView3EditModalHistory t={this.props.t}/>}
                    </Modal.Body>
                </Modal>
            </div>
        );
    };
}