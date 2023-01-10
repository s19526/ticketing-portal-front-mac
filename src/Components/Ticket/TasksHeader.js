import {Component} from "react";

export class TasksHeader extends Component{
    render() {
        return (
            <div className="jumbotron mb-5 text-center">
                <h1>Welcome!</h1>
                <p>Here's the list of all your tickets!</p>
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control" size="50" placeholder="Key words" required/>
                        <div className="input-group-btn">
                            <button type="button" className="btn btn-main" onClick={()=>this.props.onClick}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}