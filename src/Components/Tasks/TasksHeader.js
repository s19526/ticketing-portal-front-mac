import {Component} from "react";

export class TasksHeader extends Component{
    render() {
        return (
            <div className="jumbotron mb-5 text-center">
                <h1>Welcome!</h1>
                <p>Here's the list of all your tickets!</p>
            </div>
        );
    }
}