import React from "react";
import { NavLink } from "react-router-dom";
import Register from "./users/Register";


function Checkout({ setIsLoggedIn, setEmail }) {
  return (
    <>
      <h1>Check Out</h1>
      <Register setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} />
      <h1>Order Summary</h1>

      {/* <button onClick="window.location.href='http://localhost:3000/Congratulations';">Place Order</button> */}
      <button><NavLink className="CategoryLink" to="/Congratulations">Place Order</NavLink></button>

    </>
  );
}
export default Checkout;
