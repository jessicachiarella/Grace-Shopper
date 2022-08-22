import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getMyInfo, getUnpurchasedCart } from "../api/index.js";
import DeleteFromCart from "./DeleteFromCart";
import EditCart from "./EditCart";


const Cart = (params) => {
  const { isLoggedIn, cart, setCart } = params;
  console.log(cart, "this is cart")
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/Checkout");
  }

  async function checkCart() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const user = await getMyInfo(token);
      const userId = user.id;
      const currentCart = await getUnpurchasedCart(userId);
      if (currentCart) {
        setCart(currentCart);
      }
    } else {
      const products = JSON.parse(localStorage.getItem("cart"));
      if (products) {
        setCart({products:products});
      }
    }
  }

  useEffect(() => {
    checkCart();
  }, [cart && cart.products && cart.products.length]);

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
                  key={`Cart1: ${element.id}`}
                  className="EachProduct"
                >
                  <h2 id="cartname">{element.name}</h2>
                  <p id="cartquantity">Quantity: {element.quantity}</p>
                  < EditCart isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />
                  <p id="cartprice">${element.price}</p>
                  <img src={image} alt={element.cartphoto} width={100} />
                  < DeleteFromCart isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />
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
                      key={`Cart: ${element.id}`}
                      className="EachProduct"
                    >
                      <h2 id="cartname">{element.productName}</h2>
                      <p id="cartquantity">Quantity: {element.quantity}</p>
                      < EditCart itemId={element.id} itemQuantity={element.quantity} isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />
                      <p id="cartprice">${element.productPrice}</p>
                      <img src={image} alt={element.cartphoto} width={100} />
                      < DeleteFromCart id={element.id} isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} />
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
