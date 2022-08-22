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
      //added else portion here to handle guest user and set order summary
    } else {
      const guestCart = localStorage.getItem("cart");
      if(guestCart){
        setOrderSummary(guestCart)
      } else {console.log("no unpurhcased in local storage") }
    }
  }
  useEffect(() => {
    getUser();
    ;
  }, []);
  
console.log(orderSummary, "orderSumamry")
  async function handleSubmit(event) {
    event.preventDefault();
    if(orderSummary.cartId){
    console.log(orderSummary.cartId, "this is ordersumamry.cartId from frontend")
    await editIsPurchased(orderSummary.cartId);
    const result = await createOrderHistory(orderSummary.cartId)
    console.log(result, "This is my result")
    setCart({products:[]});
    console.log(cart, "this is my cart after i supposedly reset it in checkout")
    navigate("/Congratulations");
  } else {
    setCart(localStorage.setItem("cart", []));
      navigate("/Congratulations")
    }
  }
  if (cart && cart.products && cart.products.length) {
    if (isLoggedIn) {
      return (
        <div>
          <h1>Check Out</h1>
          <h2>Order Summary</h2>
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
                  <h3 id="cartname">{element.name}</h3>
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
              <h2>Order Summary</h2>
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
                      <h3 id="cartname">{element.productName}</h3>
                      <p id="cartquantity">Quantity: {element.quantity}</p>
                      <p id="cartprice">${element.productPrice}</p>
                      <img src={image} alt={element.cartphoto} width={100} />
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
        <h2>You have not added any babies to your cart...</h2>
      </div>
    );
  }

};
export default Checkout;