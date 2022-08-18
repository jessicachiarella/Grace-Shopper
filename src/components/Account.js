import React, { useState, useEffect } from "react";
import { getOrderHistory, getMyInfo } from "../api/index";
import { NavLink } from "react-router-dom";

const Account = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [myInfo, setMyInfo] = useState([]);

  async function fetchMyInfo() {
    const token = localStorage.getItem("token");
    const user = await getMyInfo(token);
    setMyInfo(user);
  }
  useEffect(() => {
    fetchMyInfo();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (myInfo.id) {
      getOrderHistory(myInfo.id, token).then((results) => {
        setOrderHistory(results);
        console.log(results, "this is the results")
      });
    }
  }, [myInfo]);
  return (
    <div id="AllPlantsPage">
      <h1 className="Accountinfo">Account Information</h1>

      <div>
        <h2 className="orderhisttitle">Your Growing Plant Fam</h2>
        <div>
          {orderHistory.length ? (
            orderHistory.map((element) => {
              const { cartId, datePurchased } = element;
              if (element) {
                return (
                  <div id="orderhist" key={element.id} className="EachOrder">
                    <p id="orderName">A {element.name} baby joined your family on {element.datePurchased}</p>
                    <p id="orderprice"> Investment: ${element.price}, Return: <i>Priceless</i></p>
                  </div>
                );
              }
            })
          ) : (
            <div>You have not purchased plant babies at this time.</div>
          )}
        </div>
      </div>
      <NavLink className="Links" to="/RenderAllPlants">Grow your family!</NavLink>
    </div>
  );
};

export default Account;
