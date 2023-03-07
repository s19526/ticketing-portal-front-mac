import NavigationView2User from "./Navigation-View2-User";
import NavigationView1Sign from "./Navigation-View1-Sign";
function NavigationBar() {
    return (
        <nav className="navbar navbar-header navbar-expand-sm fixed-top">
            <div className="container d-flex">
                <a className="navbar-brand" href="/"><i className="bi bi-tornado"></i> Home</a>
                <div className="position-relative end-0 text-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {checkUser() ? <NavigationView2User></NavigationView2User> :
                        <NavigationView1Sign></NavigationView1Sign>}
                </div>
            </div>
        </nav>
    );

    function checkUser() {
        let user = sessionStorage.getItem("user");
        if (user != null) {
            return true;
        } else {
            return false;
        }
    }

}

export default NavigationBar;




