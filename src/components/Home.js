import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <main className="homeScreen">
            <a href="/landing.jpeg" >
            <div className="homeShopAllPlants">
            <NavLink className="ShopAllPlants" to="/RenderAllPlants">
              SHOP ALL PLANTS
            </NavLink>
            </div>
            </a>
        </main>
    )
}

export default Home;