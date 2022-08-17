import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <main className="homeScreen">
            <div className="homeShopAllPlants">
            <NavLink className="ShopAllPlants" to="/RenderAllPlants">
              Shop All Plants
            </NavLink>
            </div>
        </main>
    )
}

export default Home;