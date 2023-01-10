import {Component} from "react";

export class AccountHeader extends Component{
    render() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        return (
            <div className="jumbotron container-fluid text-center">
                <h1>Hello {user.name} {user.lastname}!</h1>
                <p>This is your Account settings page!</p>
                <i className="bi bi-person-bounding-box"></i>
            </div>
        );
    }
}