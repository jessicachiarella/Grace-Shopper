import React, { useState } from "react";
import { createCart, getCartById, getUserByEmail } from "../../db";
import { addToCart } from "../api";

const AddToCart = ({
  cart,
  setCart,
  productId,
  productName,
  productPrice,
  isLoggedIn,
}) => {
  const [quantity, setQuantity] = useState(1);
  async function handleSubmit(event) {
    event.preventDefault();
    if (isLoggedIn) {
        const user = await getUserByEmail(localStorage.getItem("email"));
        const userId = user.id
        const cart = await getCartById (userId)
        if (cart.id) {
          const newItem = await addToCart(productId);
          setCart(...cart, newItem);
        } else {
          const user = await getUserByEmail(localStorage.getItem("email"));
          const userId = user.id
          const newCart = createCart(userId);
          addToCart(productId);
          const newItem = await addToCart(productId);
          setCart(newCart, newItem);
        }
      } else {
            //how do we do multiple items in local storage?
           const cart = localStorage.getItem("cart")
           if(cart){
            localStorage.setItem("cart", [...cart, {productId, productName, productPrice, quantity}])
           }else{
            localStorage.setItem("cart", [{productId, productName, productPrice, quantity}])
           }
        
        } 
      }


  }
  return (
    <form onSubmit={handleSubmit}>
      <button id="addToCart" type="Submit">
        ADD TO CART
      </button>
    </form>
  );
};

export default DeleteRoutine;
