import { createOrderHistory, editIsPurchased, getMyInfo, getOrderHistory, getUnpurchasedCart } from "../api/index.js";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";



const Checkout = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState([]);

  const token = localStorage.getItem("token")
  const user = await getMyInfo(token);
  const userId = user.id

  async function getUser(){
    if (token) {
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
  
  async function checkOrderHistory(){
      const history = await getOrderHistory(userId, token)
      if(!history.length){
        const result = await createOrderHistory(orderSummary.cartId)
        return result;
      }
  }

console.log(orderSummary, "orderSumamry")

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(orderSummary.cartId, "this is ordersumamry from frontend")
    await editIsPurchased(orderSummary.cartId);
    await checkOrderHistory();
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
