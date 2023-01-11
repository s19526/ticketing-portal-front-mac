import React, {Component, useState} from 'react';
import {Button, Form} from "react-bootstrap";

export class AccountPersonalForm extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();
        let user = this.props.u;
        user.name = event.target.AccountName.value;
        user.lastName = event.target.AccountLastname.value;
        if (event.target.AccountPassword.value!=="") {
            user.passwordSalt = btoa(event.target.AccountPassword.value);
        }

        fetch(process.env.REACT_APP_API + "/users/update",
            {
                method: 'PUT',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                ),
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                let x = JSON.parse(sessionStorage.getItem("user"));
                x.name=data.name;
                x.lastname=data.lastName;
                sessionStorage.setItem("user",JSON.stringify(x));
                document.location.reload();
            })
            .catch(e => console.log(e));
    }
    render(){
        return(
            <div>
                <Form id="form" className="mx-auto w-50" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-2" controlId="AccountId">
                        <Form.Label>Account Id</Form.Label>
                        <Form.Control type="id" name="AccountId" defaultValue={this.props.u?.id} disabled placeholder="Account Id"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="AccountName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="AccountName" defaultValue={this.props.u?.name} placeholder="Name"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="AccountLastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" name="AccountLastname" defaultValue={this.props.u?.lastName} placeholder="Lastname"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="AccountEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="AccountEmails" disabled defaultValue={this.props.u?.email} placeholder="Email"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="AccountCreated">
                        <Form.Label>Date created</Form.Label>
                        <Form.Control type="text" name="AccountCreated" disabled defaultValue={this.props.u?.dateAdded} placeholder="Created at"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2 pt-5" controlId="AccountPassword">
                        <Form.Label>Change password</Form.Label>
                        <Form.Control type="password" name="AccountPassword" placeholder="Write your new password here"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 text-center">
                        <Button variant="btn btn-success btn-md" type="submit">
                            Update account details and password
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}