import React from "react";
import {  useNavigate } from "react-router-dom";
import { RegisterPerson } from "../../api/index.js";

const Register = ({setEmail, setIsLoggedIn}) => {
    const navigate = useNavigate();
    async function handleSubmit(event) {
    event.preventDefault();
    const result = await RegisterPerson(event);
    if(result.token){
        setIsLoggedIn(true);
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.user.email);
        setEmail(result.user.email);
        alert("You have successfully created an account!")
        navigate("/Home");
    }else if(result.error) {
      alert(result.error);
    } 
  }
    
  return (
    <div id="registerBox">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up for an Account</h1>
        <label>Enter Email</label>
        <input id="emailregister" placeholder="enter your email" required></input>
        <label>Create Password (8 characters minimum)</label>
        <input id="passwordregister" placeholder="create password here"></input>
        <label>Enter Your Full Name</label>
        <input id="fullnameregister" placeholder="enter your full name" required></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
export default Register;
