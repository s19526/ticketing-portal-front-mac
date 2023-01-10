import React, {Component, useRef} from 'react';
import {Button, ButtonToolbar, Form, Table} from "react-bootstrap";

export class AccountOrganization extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this)
        this.state = {users:[]};
    }

    handleSubmit(){
        return null;
    }

    render(){
        const {users} = this.state;
        return(
            <Table className="w-75 mx-auto align-middle" bordered striped hover size="sm">
                <thead>
                <tr><th>Id</th><th>Email</th><th>Name</th><th>Lastname</th><th  className="text-center">Status</th><th className="text-center">Actions</th></tr>
                </thead>
                <tbody>
                {users?.map(u=>
                    <tr className={u.active?"bg-lightgreen":"bg-lightgrey"} key={u.id}>
                        <td width={"50px"} align={"center"}>{u.id}</td>
                        <td width={"300px"} className="text-center">{u.email}</td>
                        <td width={"100px"}>{u.name}</td>
                        <td >{u.lastName}</td>
                        <td width={"100px"} >{u.active?"Active":"Deactivated"}</td>
                        <td width={"200px"} className="text-center">
                                <Button className="m-auto btn-main btn-md w-75" type="button" onClick={()=>this.changeUserStatus(u,u.active)}>{u.active?"Deactivate":"Activate"}</Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        );
    }

    getOrganizationUsers() {
        fetch((process.env.REACT_APP_API + '/organizations/' + this.props.u?.userOrganizations[0].organization.id)+"/users",
            {
                method: 'GET',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN
                    }
                )
            })
            .then(response => response.json())
            .then(data => {
                this.setState({users:data});
            }).catch(e => console.log(e));
    }

    changeUserStatus(user,status){
        let u1 = new URL(process.env.REACT_APP_API + '/users/' + user.id + "/deactivate");
        let u2 = new URL (process.env.REACT_APP_API + '/users/' + user.id + "/activate");
        fetch(status?u1:u2,
                {
                method: 'POST',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN,
                        Accept: 'application/json'
                        }
                    )
                }
            )
            .then(r=>r.ok)
            .then(data => {
                console.log(data);
                this.getOrganizationUsers();
            }).catch(e => console.log("Error" + e));

    }

    componentDidMount() {
        this.getOrganizationUsers();
    }

}