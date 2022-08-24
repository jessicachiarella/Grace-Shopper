import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../api/index";


const RenderPots = () => {
    const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {
    getAllPlants().then((results) => {
      setAllPlants(results);
    });
  }, []);


  return (
    <div className="AllPlantsPage">
      <div className="TitleContainer">
      <h1 className="PageHeader" id="ProfileHeader">
        Plant Homes
      </h1>
        <div className="productRow">
          {allPlants.length ? (
            allPlants.map((element) => {
              const { id, name, price, categoryId, image_url } = element;
              const image = element.image_url
              if (element.categoryId === 4) {
                return (
                  <div id="PotNames" key={element.id} className="EachProduct">
                    <div className="ProductText">
                    <h3 id="name">{element.name}</h3>
                    <p id="price">${element.price}</p>
                    </div>
                    <img src={image} alt={element.name} width={300}/>
                    <button>
                    <NavLink className="ProductLink" to={`/RenderPots/${id}`}>View Product</NavLink>
                    </button> 
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your Pots... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderPots;