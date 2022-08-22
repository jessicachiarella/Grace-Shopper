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
            <NavLink className="headerLinks" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="headerLinks" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="headerLinks" to="/Care">
              Care
            </NavLink>
            <NavLink className="headerLinks" to="/users/Login">
              Login
            </NavLink>
            <NavLink className="headerLinks" to="/Cart">
              Cart
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div>
            <NavLink className="headerLinks" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="headerLinks" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="headerLinks" to="/Care">
              Care
            </NavLink>
            <NavLink className="headerLinks" to="/Account">
            Account
          </NavLink>
          <NavLink className="headerLinks" to="/users/Logout">
            Logout
          </NavLink>
            <NavLink className="headerLinks" to="/Cart">
              Cart
            </NavLink>
          </div>
        </>
      )}
    </header>
  );
}
export default Header;
