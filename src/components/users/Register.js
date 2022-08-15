import React from "react";
import { RegisterPerson } from "../../api/index.js";
import "./Register.css";
async function handleSubmit(event) {
  event.preventDefault();
  const result = await RegisterPerson(event);
  if (result.error) {
    alert(result.error);
  }
}
const Register = () => {
  return (
    <div id="registerBox">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up for an Account</h1>
        <label>Enter Email</label>
        <input id="emailregister" placeholder="enter your email"></input>
        <label>Create Password</label>
        <input id="passwordregister" placeholder="create password here"></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
export default Register;

