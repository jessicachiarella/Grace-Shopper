import { editIsPurchased, getMyInfo, getUnpurchasedCart } from "../api/index.js";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState([]);

  async function getUser(){
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      const user = await getMyInfo(token);
      const userId = user.id
      const summary = await getUnpurchasedCart(userId)
      if(summary){
        setOrderSummary(summary)
      } else {console.log("no unpurhcased") }
    }
  }
 
  useEffect(() => {
    getUser();
    ;
  }, []);
  

console.log(orderSummary, "orderSumamry")

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(orderSummary.cartId, "this is ordersumamry from frontend")
    await editIsPurchased(orderSummary.cartId);
    navigate("/Congratulations");

  }

  return (
    <>
      <h1>Check Out</h1>
      <h1>Order Summary</h1>

      <button id="checkOut" type="Submit" onClick={handleSubmit}>
        Check Out
      </button>
    </>
  );
};
export default Checkout;
