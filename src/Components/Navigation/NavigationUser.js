function Navigation() {
    return(
            <div className="collapse navbar-collapse" id="mynavbar">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item d-flex align-items-center d-flex justify-content-end ">
                        <a className="nav-link" href="/tasks">
                            <i className="bi bi-pass"></i>
                            My tickets</a>
                    </li>
                    <li className="nav-item d-flex align-items-center d-flex justify-content-end">
                        <a className="nav-link" href="/account">
                            <i className="bi bi-person-vcard"></i>
                            My Account</a>
                    </li>
                    <li className="nav-item d-flex align-items-center d-flex justify-content-end">
                        <a className="nav-link" onClick={x=>sessionStorage.clear()} href="/">
                            <i className="bi bi-power"></i>
                        </a>
                    </li>
                </ul>
            </div>
    );

}
export default Navigation;




