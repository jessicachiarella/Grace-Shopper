import React from "react";
import { NavLink } from "react-router-dom";






function Congratulations({isLoggedIn}) {

  
    return (
    <main className="Congratulations">
      <div className="congratsText">
        <h1>Congratulations</h1>
        {isLoggedIn ? (
          <NavLink to={`/Account`}>View Account</NavLink>
        ) : (
          <NavLink to={`/RenderAllPlants`}>View All Plants</NavLink>
        )}
      </div>
    </main>
  );
}

export default Congratulations;
