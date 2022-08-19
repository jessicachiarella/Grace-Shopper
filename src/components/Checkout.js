import { createOrderHistory, editIsPurchased, getMyInfo, getOrderHistory, getUnpurchasedCart } from "../api/index.js";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

const Checkout = (params) => {
  const { isLoggedIn, cart, setCart } = params;
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState([]);
  const token = localStorage.getItem("token")
  async function getUser(){
    if (token) {
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
  // async function checkOrderHistory(){
  //   const user = await getMyInfo(token);
  //   const userId = user.id
  //     const history = await getOrderHistory(userId, token)
  //     if(!history.length){
  //       const result = await createOrderHistory(orderSummary.cartId)
  //       return result;
  //     }
  // }
console.log(orderSummary, "orderSumamry")
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(orderSummary.cartId, "this is ordersumamry from frontend")
    await editIsPurchased(orderSummary.cartId);
    const result = await createOrderHistory(orderSummary.cartId)
    console.log(result, "This is my result")
    setCart({products:[]});
    navigate("/Congratulations");
  }
  if (cart && cart.products && cart.products.length) {
    if (isLoggedIn) {
      return (
        <div>
          <h1>Check Out</h1>
          <h1>Order Summary</h1>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, name, quantity, price, image_url } = element;
              const image = element.image_url;
              return (
                <div
                  id="cartcontainer"
                  key={`Checkout: ${element.id}`}
                  className="EachProduct"
                >
                  <h2 id="cartname">{element.name}</h2>
                  <p id="cartquantity">Quantity: {element.quantity}</p>
                  <p id="cartprice">${element.price}</p>
                  <img src={image} alt={element.cartphoto} width={100} />
                  {/* <NavLink to={`/RenderAllPlants/${id}`}>View Product</NavLink> */}
                </div>
              );
            })
          ) : (
            <div> Loading your Plants... </div>
          )}
          <button id="placeOrder" type="Submit" onClick={handleSubmit}>
        Place Order
      </button>
        </div>
      );
    } else {
        return (
            <div>
              <h1>Check Out</h1>
              <h1>Order Summary</h1>
              {cart.products.length ? (
                cart.products.map((element) => {
                  const { id, productName, quantity, productPrice, image_url } = element;
                  const image = element.image_url;
                  return (
                    <div
                      id="cartcontainer"
                      key={`Checkout2: ${element.id}`}
                      className="EachProduct"
                    >
                      <h2 id="cartname">{element.productName}</h2>
                      <p id="cartquantity">Quantity: {element.quantity}</p>
                      <p id="cartprice">${element.productPrice}</p>
                      <img src={image} alt={element.cartphoto} width={100} />
                      {/* <NavLink to={`/RenderAllPlants/${id}`}>View Product</NavLink> */}
                    </div>
                  );
                })
              ) : (
                <div> Loading your Plants... </div>
              )}
              <button id="placeOrder" type="Submit" onClick={handleSubmit}>
              Place Order
      </button>
            </div>
          );
    }
  } else {
    return (
      <div>
        <h1>you have not added any babies to your cart</h1>
      </div>
    );
  }
  // return (
  //   <>
  //     <h1>Check Out</h1>
  //     <h1>Order Summary</h1>
  //     <button id="checkOut" type="Submit" onClick={handleSubmit}>
  //       Check Out
  //     </button>
  //   </>
  // );
};
export default Checkout;