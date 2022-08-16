import React, { useState, useEffect } from "react";
import { getOrderHistory, getMyInfo } from "../api/index";

const Account = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [myInfo, setMyInfo] = useState([]);

  async function fetchMyInfo() {
    const token = localStorage.getItem("token");
    const user = await getMyInfo(token);
    console.log(user, "is this userrrr");
    setMyInfo(user);
  }
  useEffect(() => {
    fetchMyInfo();
  }, []);

  useEffect(() => {
    console.log(myInfo, "is this myinfo");
    const token = localStorage.getItem("token");
    if (myInfo.id) {
      getOrderHistory(myInfo.id, token).then((results) => {
        setOrderHistory(results);
      });
    }
  }, [myInfo]);
  console.log(myInfo, "my infoooooo");
  console.log(orderHistory, "orderhistory??????");
  return (
    <div id="AllPlantsPage">
      <h1 className="Accountinfo">Account Information</h1>

      <div>
        <h2 className="orderhisttitle">My Orders:</h2>
        <div>
          {orderHistory.length ? (
            orderHistory.map((element) => {
              const { cartId, datePurchased } = element;
              if (element.categoryId !== 4) {
                return (
                  <div id="orderhist" key={element.id} className="Eachcart">
                    <h2 id="cartnum">Order Number:{element.cartId}</h2>
                    <h2 id="date">Date Purchased:{element.datePurchased}</h2>
                    <p id="productname">${element.price}</p>

                    <div id="products">{product}</div>
                    {products.length
                      ? products.map((element) => {
                          const { name, price, quantity } = element;
                          return (
                            <div key={element.id}>
                              <h4 id="productName">
                                Product Name:{element.name}
                              </h4>
                              <h4 id="productPrice">Price:{element.price}</h4>
                              <h4 id="productQuantity">
                                Quantity:{element.name}
                              </h4>
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your Account... </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
