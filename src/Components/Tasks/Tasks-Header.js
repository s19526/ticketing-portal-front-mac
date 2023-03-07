import {Component} from "react";

export class TasksHeader extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Initiated state change");
        this.props.f(event.target.keyword.value);
    }

    render() {
        return (
            <div className="jumbotron text-center">
                <h1>Welcome!</h1>
                <p>Here's the list of all your tickets!</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="keyword" size="50" placeholder="Key word"/>
                        <div className="input-group-btn">
                            <button type="submit" className="btn btn-main">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}