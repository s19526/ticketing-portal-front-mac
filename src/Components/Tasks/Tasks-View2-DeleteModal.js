import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";

export class TasksView2DeleteModal extends Component {

    handleSubmit() {
        console.log(this.props.t);
        fetch(process.env.REACT_APP_API + "/tickets/" + this.props.t.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + process.env.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log('Deleted a record id: ' + result.id)
            }, (error) => {
                console.log(error)
            }).catch(e => console.log(e))
    }

    render() {
        return (
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-titled-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Confirm Deletion
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to close this ticket?<br/>Keep in mind you cannot revert this change.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-main btn btn-md" onClick={this.props.onHide}>No, go back</Button>
                        <Button className="btn-danger btn btn-md" onClick={() => {
                            this.handleSubmit();
                            this.props.onHide()
                        }}>Yes, close it</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}
