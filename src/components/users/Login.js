import React from "react";
import { useNavigate } from "react-router";
import { LoginPerson } from "../../api";

const Login = ({ setLoggedIn, setEmail }) => {
    const navigate = useNavigate();
  
    async function handleSubmit(event) {
      event.preventDefault();
      const loginEmail = event.target[0].value;
      const result = await LoginPerson(event);
      if (result.token) {
        setLoggedIn(true);
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", loginEmail);
        setEmail(loginEmail);
      } else {
        alert(result.error);
      }
  
      navigate("/Home");
    }
  
    const registerButton = async (event) => {
      event.preventDefault();
      navigate("/users/Register");
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log into your Full Bloom account</h1>
        <label className="inputLabels">
          Email
          <input id="email"
            type="text"
            placeholder="Your Email Here"
          />
        </label>
        <label className="inputLabels">
          Password
          <input id="password"
            type="text"
            placeholder="Your Password Here"
          />
        </label>
        <button id="submit" type="Submit">
          Submit
        </button>
        <button id="register" type="Submit" onClick={registerButton}>
          Don't have an account? Create one here.
        </button>
      </form>
    </div>
  );
}
export default Login;