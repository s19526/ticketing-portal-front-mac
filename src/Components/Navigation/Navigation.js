import {useState} from "react";



function Navigation() {
    const [user, setUser] = useState(false);
    const [showSignInUp, setShowSignInUp] = useState(null);

    return(
        <nav className="navbar navbar-header navbar-expand-sm fixed-top ">
            <div className="container d-flex">
                <a className="navbar-brand" href="/"><i className="bi bi-tornado"></i> Home</a>
                <div className="position-relative end-0 text-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav me-auto" show={showSignInUp}>
                            <li className="nav-item d-flex align-items-center d-flex justify-content-end ">
                                <a className="nav-link" href="sign-in">
                                    <i className="bi bi-person-circle"></i>
                                    Sign-In</a>
                            </li>
                            <li className="nav-item d-flex align-items-center d-flex justify-content-end">
                                <a className="nav-link" href="sign-up">
                                    <i className="bi bi-person-add"></i>
                                    Sign-up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );

    function checkUser(){
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user.get("id") != null) {
            this.setState({user: user, showSignInUp: true})
        } else {
            this.setState({user: null, showSignInUp: false})
        }
    }


}
export default Navigation;




