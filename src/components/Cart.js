import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = (params) => {
  const { isLoggedIn, cart } = params;
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/Checkout");
  }

  if (cart && cart.products && cart.products.length) {
    if (isLoggedIn) {
      return (
        <div>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, name, quantity, price, image_url } = element;
              const image = element.image_url;
              return (
                <div
                  id="cartcontainer"
                  key={element.id}
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
          <button id="checkOut" type="Submit" onClick={handleSubmit}>
       Check Out
    </button>
        </div>
      );
    } else {
        return (
            <div>
              {cart.products.length ? (
                cart.products.map((element) => {
                  const { id, productName, quantity, productPrice, image_url } = element;
                  const image = element.image_url;
                  return (
                    <div
                      id="cartcontainer"
                      key={element.id}
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
              <button id="checkOut" type="Submit" onClick={handleSubmit}>
       Check Out
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
};

export default Cart;
