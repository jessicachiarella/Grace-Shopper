import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../api/index";


const RenderPlantNoobs = () => {
    const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {
    getAllPlants().then((results) => {
      setAllPlants(results);
    });
  }, []);


  return (
    <div id="AllPlantsPage">
      <h1 className="PageHeader" id="ProfileHeader">
        PLANT NOOBS
      </h1>

      <div>
        <aside className="CategoryLinkBox"><h3>View Plants by Skill Level</h3>
        <NavLink className="CategoryLink" to="/RenderPlantNoobs">
              Plant Noobs
            </NavLink>
        <NavLink className="CategoryLink" to="/RenderGreenThumbs">
              Green Thumbs
            </NavLink>
        <NavLink className="CategoryLink" to="/RenderDivas">
              Divas
            </NavLink>
        </aside>
        <div>
          {allPlants.length ? (
            allPlants.map((element) => {
              const { id, name, price, categoryId, image_url } = element;
              const image = element.image_url
              if (element.categoryId === 1) {
                return (
                  <div id="PlantNoobs" key={element.id} className="EachProduct">
                    <h3 id="name">{element.name}</h3>
                    <p id="price">${element.price}</p>
                    <img src={image} alt={element.name} width={200}/>
                    <NavLink to={`/RenderPlantNoobs/${id}`}>View Product</NavLink>
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your PlantNoobs... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderPlantNoobs;