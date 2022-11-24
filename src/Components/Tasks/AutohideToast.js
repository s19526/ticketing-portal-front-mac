import {Toast} from "react-bootstrap";
import React from "react";
export default function AutohideToast(){

    const[show,setShow]=false;
    return(
        <Toast onClose={()=>setShow(false)} show={show} delay={1000} autohide={}>
            <Toast.Header>
                <img
                    src="../../Assets/landing-form.png"
                    className="rounded me-2"
                    alt="image-toast"
                />
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>

    )

}
