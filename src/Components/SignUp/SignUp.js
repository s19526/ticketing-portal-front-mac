import teamwork_image from "../../Assets/landing-teamwork.jpg";
import {useNavigate} from "react-router-dom";
import {SignUpHeader} from "./SignUpHeader";

export default function SingUpForm(){

    const navigate = useNavigate();
    function handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"/users/create",{
            method:'POST',
            headers:{
                'Authorization' : 'Basic ' + process.env.TOKEN,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email:event.target.userEmail.value,
                name:event.target.userName.value,
                lastName:event.target.userLastName.value,
                passwordSalt:btoa(event.target.userPassword.value),
                dateAdded:Date.now()
            })
        })
            .then(res=>res.json())
            .then(
                result=>{console.log('Created the new record ' + result.id);sessionStorage.setItem("user",JSON.stringify(result));navigate("/tasks")},
                error=>{console.log("Error: " + error)})
            .catch(e=>console.log(e));
    }
    return(
        <div>
            <SignUpHeader></SignUpHeader>
            <div className="m-4 row slide">
                <div className="col-sm-6">
                    <img src={teamwork_image} className="img-fluid rounded-end"/>
                </div>
                <div className="col-sm-6 pt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input type="text" id="userName" className="form-control"/>
                                    <label className="form-label" htmlFor="userName">First name</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <input type="text" id="userLastName" className="form-control"/>
                                    <label className="form-label" htmlFor="userLastName">Last name</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="email" id="userEmail" className="form-control"/>
                            <label className="form-label" htmlFor="userEmail">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="userPassword" className="form-control"/>
                            <label className="form-label" htmlFor="userPassword">Password</label>
                        </div>

                        <button type="submit" className="btn btn-main btn-block mb-4">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
