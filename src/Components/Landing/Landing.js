import {Component} from "react";
import {LandingHeader} from "./Landing-Header";
import {LandingAbout} from "./Landing-About";
import {LandingServices} from "./Landing-Services";

export class Landing extends Component {

    render() {
        return (
            <div>
                <LandingHeader></LandingHeader>
                <div className="slide"><LandingAbout></LandingAbout>
                    <LandingServices></LandingServices></div>
            </div>
        )
    }

}