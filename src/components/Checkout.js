import { editIsPurchased, getUnpurchasedCart } from "../api/index.js";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [orderSummary, setOrderSummary] = useState([]);
  
  useEffect(() => {
    getUnpurchasedCart(userId).then((results) => {
    setOrderSummary(results);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/Congratulations");
    const result = await editIsPurchased(cartId);
    return result;
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
