import {Component} from 'react';
import SignUpForm from "./SignUpForm";
import {SignUpHeader} from "./SignUpHeader";

export class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={tasks:[],addModalShow:false, editModalShow:false}
    }
    render() {
        return (
            <div>
                <SignUpHeader></SignUpHeader>
                <SignUpForm></SignUpForm>
            </div>
        );
    }
}