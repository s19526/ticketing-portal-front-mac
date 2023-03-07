function NavigationView2User() {
    return (
        <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
                <li className="nav-item d-flex align-items-center d-flex justify-content-end">
                    <a className="nav-link" href="/agent" hidden={!sessionStorage.getItem("permissions").includes("3")}>
                        <i className="bi bi-keyboard"></i>
                        Agent view</a>
                </li>
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
                    <a className="nav-link" onClick={() => sessionStorage.clear()} href="/">
                        <i className="bi bi-power"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default NavigationView2User;




