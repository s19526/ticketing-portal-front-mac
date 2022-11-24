import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import {Fingerprint} from "@mui/icons-material";
export class Navigation extends Component{
    render(){
        return(
            <Navbar expand ="md" variant="light" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" color="primary"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/">
                      Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="tasks">
                        Tasks
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="users">
                        Users
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="sign-in">
                        <Fingerprint/> Sign In
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="sign-up">
                        Sign up
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}