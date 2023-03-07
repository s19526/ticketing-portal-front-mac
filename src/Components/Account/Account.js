import React, {Component} from 'react'
import {AccountHeader} from "./Account-Header";
import {Button, ButtonGroup} from "react-bootstrap";
import {AccountView1PersonalForm} from "./Account-View1-PersonalForm";
import {AccountView2Organization} from "./Account-View2-Organization";

export class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {personal: true, user: JSON, logged: false};
    }

    render() {
        return (
            <div>
                <AccountHeader></AccountHeader>
                <ButtonGroup className="btn-group btn-reverse-main d-flex mx-auto w-75 mt-4 mb-4">
                    <Button active={this.state.personal}
                            onClick={() => this.setState(prevState => ({personal: !prevState.personal}))}>
                        Personal Data
                    </Button>
                    <Button active={!this.state.personal}
                            onClick={() => this.setState(prevState => ({personal: !prevState.personal}))}>
                        Organization
                    </Button>
                </ButtonGroup>
                {this.state.personal ? <AccountView1PersonalForm u={this.state.user}/> :
                    <AccountView2Organization u={this.state.user}/>}
            </div>
        );
    }

    getUser() {
        fetch((process.env.REACT_APP_API + '/users/' + JSON.parse(sessionStorage.getItem("user")).id),
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
                this.setState({user: data});
            }).catch(e => console.log(e));
    }

    componentDidMount() {
        this.getUser();
    }
}