import {Component} from "react";

export class LandingServices extends Component{
    render() {
        return(
            <div id="services" className="container-fluid text-center p-5">
                <h2>SERVICES</h2>
                <h4>What we offer</h4>
                <br/>
                    <div className="row">
                        <div className="col-sm-4">
                            <span className="bi bi-activity"></span>
                            <h4>POWER</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="bi bi-balloon-heart"></span>
                            <h4>LOVE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="bi bi-briefcase"></span>
                            <h4>JOB DONE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-4">
                            <span className="bi bi-recycle"></span>
                            <h4>GREEN</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="bi bi-check-circle"></span>
                            <h4>CERTIFIED</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                        <div className="col-sm-4">
                            <span className="bi bi-trophy"></span>
                            <h4>HARD WORK</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                        </div>
                    </div>
            </div>
        )
    }
}