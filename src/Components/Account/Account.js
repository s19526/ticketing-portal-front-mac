import React,{Component} from 'react'
import {AccountHeader} from "./AccountHeader";
import {Button, ButtonGroup} from "react-bootstrap";
import {AccountPersonalForm} from "./AccountPersonalForm";
import {AccountOrganization} from "./AccountOrganization";

export class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {personal: true, user:JSON};
    }

    render() {
        return (
            <div>
                <AccountHeader></AccountHeader>
                <ButtonGroup  className="btn-group btn-reverse-main d-flex mx-auto w-75 mt-4 mb-4">
                    <Button active={this.state.personal} onClick={()=>this.setState(prevState=>({personal:!prevState.personal}))}>
                        Personal Data
                    </Button>
                    <Button active={!this.state.personal} onClick={()=>this.setState(prevState=>({personal:!prevState.personal}))}>
                        Organization
                    </Button>
                </ButtonGroup>
                {this.state.personal ? <AccountPersonalForm u={this.state.user}/> : <AccountOrganization u={this.state.user}/>}
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
                this.setState({user:data});
            }).catch(e => console.log(e));
    }

    componentDidMount() {
        this.getUser();
    }
}