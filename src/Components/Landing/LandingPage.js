import {Component} from "react";
import {LandingHeader} from "./LandingHeader";
import {LandingAbout} from "./LandingAbout";
import {LandingServices} from "./LandingServices";

export class LandingPage extends Component{

    render() {
        return(
            <div>
                <LandingHeader></LandingHeader>
                <div className="slide"><LandingAbout></LandingAbout>
                <LandingServices></LandingServices></div>
            </div>
        )
    }

}