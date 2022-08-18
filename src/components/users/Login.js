import React from "react";
import { useNavigate } from "react-router";
import { LoginPerson } from "../../api";
import { Register } from "../index";

const Login = ({ setIsLoggedIn, setEmail }) => {
    const navigate = useNavigate();
  
    async function handleSubmit(event) {
      event.preventDefault();
      const loginEmail = event.target[0].value;
      const result = await LoginPerson(event);
      if (result.token) {
        setIsLoggedIn(true);
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", loginEmail);
        setEmail(loginEmail);
      } else {
        alert(result.error);
      }
  
      navigate("/Home");
    }
  return (
    <>
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
      </form>
    </div>
    < Register setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>
    </>
   
  );
}
export default Login;