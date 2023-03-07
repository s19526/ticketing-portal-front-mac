import {Navigate} from "react-router-dom"
import {Component} from "react";


export class LandingAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {clickedLogged: false, clickedNotLogged: false};
    }

    checkUser() {
        if (sessionStorage.getItem("user") != null) {
            this.setState({clickedLogged: true})
        } else {
            this.setState({clickedNotLogged: true})
        }
    }

    render() {
        return (
            <div>
                <div id="about" className="p-5 container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2 className="landing-h2">About Company Page</h2><br/>
                            <h4 className="landing-h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</h4><br/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</p>
                            <br/>
                        </div>
                        <div className="col-sm-4 align-self-center text-center">
                            <span className="bi-bar-chart"></span>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-main btn-lg" onClick={() => this.checkUser()}>See more!</button>
                            {this.state.clickedLogged && <Navigate to="/tasks"/>}
                            {this.state.clickedNotLogged && <Navigate to="/sign-in"/>}
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-grey p-5">
                    <div className="row">
                        <div className="col-sm-4 align-self-center text-center">
                            <span className="bi-globe-europe-africa"></span>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="landing-h2">Our Values</h2><br/>
                            <h4 className="landing-h4"><strong>MISSION:</strong> Our mission lorem ipsum dolor sit amet, consectetur adipiscing
                                elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4><br/>
                            <p><strong>VISION:</strong> Our vision Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function redirectUser() {
    if (sessionStorage.getItem("user") != null) {
        console.log("Trying to navigate tasks");
        console.log("After navigation");
    } else {
        console.log("Trying to navigate to sign-in");
        return <Navigate to="/sign-in"/>
    }
}