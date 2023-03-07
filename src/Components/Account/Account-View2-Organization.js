import React, {Component} from 'react';
import {Badge, Button, Table} from "react-bootstrap";

export class AccountView2Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    render() {
        const {users} = this.state;
        return (
            <div className="overflow-auto">
                <Table className="w-75 mx-auto align-middle" bordered striped hover size="sm">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map(u =>
                        <tr key={u.id}>
                            <td width={"50px"} align={"center"}>{u.id}</td>
                            <td width={"300px"} className="text-center">{u.email}</td>
                            <td width={"100px"}>{u.name}</td>
                            <td>{u.lastName}</td>
                            <td width={"100px"} className="text-center">{u.active ? <Badge bg="success">Active</Badge> :
                                <Badge bg="light" text="dark">Deactivated</Badge>}</td>
                            <td width={"200px"} className="text-center">
                                <Button className="m-auto btn-main btn-sm w-75"
                                        disabled={!(JSON.parse(sessionStorage.getItem("permissions")).at(1) == 2)}
                                        type="button"
                                        onClick={() => this.changeUserStatus(u, u.active)}>{u.active ? "Deactivate" : "Activate"}</Button>

                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }

    getOrganizationUsers() {
        fetch((process.env.REACT_APP_API + '/organizations/' + this.props.u?.userOrganizations[0].organization.id) + "/users",
            {
                method: 'GET',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN,
                        Accept: 'application/json'
                    }
                )
            })
            .then(response => response.json())
            .then(data => {
                this.setState({users: data});
            }).catch(e => console.log(e));
    }

    changeUserStatus(user, status) {
        let u1 = new URL(process.env.REACT_APP_API + '/users/' + user.id + "/deactivate");
        let u2 = new URL(process.env.REACT_APP_API + '/users/' + user.id + "/activate");
        fetch(status ? u1.toString() : u2.toString(),
            {
                method: 'POST',
                headers: new Headers({
                        Authorization: 'Basic ' + process.env.TOKEN,
                        Accept: 'application/json'
                    }
                )
            }
        )
            .then(r => r.ok)
            .then(data => {
                console.log(data);
                this.getOrganizationUsers();
            }).catch(e => console.log("Error" + e));

    }

    componentDidMount() {
        this.getOrganizationUsers();
    }

}