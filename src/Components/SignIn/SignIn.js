import teamwork_image from "../../Assets/landing-teamwork.jpg";
import {useNavigate} from "react-router-dom";
import {SignInHeader} from "./SignInHeader";
import {useState} from "react";

export default function SignIn() {

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+"/users/login",{
            method:'POST',
            headers:{
                'Authorization' : 'Basic ' + process.env.TOKEN,
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email:event.target.userEmail.value,
                passwordSalt:btoa(event.target.userPassword.value),
            })
        })
            .then(res=>res.json())
            .then(
                result=>{
                    console.log('Found a user, logged in ' + result.id);
                    let user = {id:result.id,name:result.name,lastname:result.lastName};
                    sessionStorage.setItem("user",JSON.stringify(user));
                    let permList=[];
                    result.userPermissions.forEach(x=>permList.push(x.permission.id))
                    sessionStorage.setItem("permissions",permList.sort((a,b) => a>b?1:-1).toString());
                    navigate("/tasks");
                    },
                error=>{
                    console.log("Error, wrong user or password " + error)
                })
            .catch(e=>console.log(e));

    }
    return(
        <div>
            <SignInHeader></SignInHeader>
            <div className="m-4 row slide">
                <div className="col-sm-6">
                    <img src={teamwork_image} className="img-fluid rounded-end"/>
                </div>
                <div className="pt-5 col-sm-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                            <input type="email" id="userEmail" className="form-control"/>
                            <label className="form-label" htmlFor="userEmail">Email address</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" id="userPassword" className="form-control"/>
                            <label className="form-label" htmlFor="userPassword">Password</label>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <button type="submit" className="btn btn-main btn-md mb-4">Sign in</button>
                            </div>
                            <div className="col text-center">
                                <p>Not a member? <a href="/sign-up">Register</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}