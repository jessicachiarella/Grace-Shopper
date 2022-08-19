import React from "react";
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {
  return (
    <header className="NavBar">
       <NavLink className="FullBloom" to="/Home">
              Full Bloom
            </NavLink>

      {!isLoggedIn ? (
        <>
          <div>
            <NavLink className="Links" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="Links" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="Links" to="/Care">
              Care
            </NavLink>
            <NavLink className="Links" to="/users/Login">
              Login
            </NavLink>
            <NavLink className="Links" to="/Cart">
              Cart
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div>
            <NavLink className="Links" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="Links" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="Links" to="/Care">
              Care
            </NavLink>
            <NavLink className="Links" to="/Account">
            Account
          </NavLink>
          <NavLink className="Links" to="/users/Logout">
            Logout
          </NavLink>
            <NavLink className="Links" to="/Cart">
              Cart
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
}
export default Header;
