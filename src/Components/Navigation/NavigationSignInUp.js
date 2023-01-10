function Navigation() {
    return(
            <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item d-flex align-items-center d-flex justify-content-end ">
                        <a className="nav-link" href="/sign-in">
                            <i className="bi bi-person-circle"></i>
                            Sign-In</a>
                    </li>
                    <li className="nav-item d-flex align-items-center d-flex justify-content-end">
                        <a className="nav-link" href="/sign-up">
                            <i className="bi bi-person-add"></i>
                            Sign-up</a>
                    </li>
                </ul>
            </div>
    );

}
export default Navigation;




