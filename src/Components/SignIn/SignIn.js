import {Component} from 'react';
import SignInForm from "./SignInForm";
import {SignInHeader} from "./SignInHeader";
export class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state={tasks:[],addModalShow:false, editModalShow:false}
    }

    render() {
        return (
            <div>
                <SignInHeader></SignInHeader>
                <SignInForm></SignInForm>
            </div>
        );
    }
}