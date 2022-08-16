import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../api/index";


const RenderGreenThumbs = () => {
    const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {
    getAllPlants().then((results) => {
      setAllPlants(results);
    });
  }, []);


  return (
    <div id="AllPlantsPage">
      <h1 className="PageHeader" id="ProfileHeader">
        GREEN THUMBS
      </h1>

      <div>
        <h2 className="PageSubHeader" id="ProfileHeader"></h2>
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
              if (element.categoryId === 2) {
                return (
                  <div id="GreenThumbs" key={element.id} className="EachProduct">
                    <h2 id="name">{element.name}</h2>
                    <p id="price">${element.price}</p>
                    <img src={image} alt={element.name} width={200}/>
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your Green Thumbs... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderGreenThumbs;