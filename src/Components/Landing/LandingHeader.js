import {Component} from "react";

export class LandingHeader extends Component{

    render() {
        return(
            <div className="jumbotron text-center container-fluid">
                <h1>Ticketly</h1>
                <p>We specialize in support</p>
                <form>
                    <div className="input-group">
                        <input type="email" className="form-control" size="50" placeholder="Key words" required/>
                            <div className="input-group-btn">
                                <button type="button" className="btn btn-main">Search</button>
                            </div>
                    </div>
                </form>
            </div>
            );
    }
}