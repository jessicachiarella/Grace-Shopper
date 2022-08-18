import React, { useState } from "react";

import { addToCart, getMyInfo, getCart, createNewCart, getProductById } from "../api";

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
        const token = localStorage.getItem("token")
        const user = await getMyInfo(token);
        const userId = user.id
        const currentCart = await getCart(userId)
        if (currentCart.cartId) {
          const addedItem = await addToCart(currentCart.cartId, productId, productName, quantity, productPrice);
          console.log(addedItem, "addItem")
          const cartCopy = {...cart}
          // if(addedItem.products.id !== cartCopy.products.id){
          cartCopy.products.push(addedItem)
          setCart(cartCopy); 
        // } 
          // else{
          //   cartCopy.products.quantity + 1
          // }
         
        } else {
          const token = localStorage.getItem("token")
          const user = await getMyInfo(token);
          const userId = user.id
          const newCart = createNewCart(userId);
          const newItem = await addToCart(cart.id, productId, productName, quantity, productPrice);
          setCart(...newCart, newItem);
        }
      } else {
            //how do we do multiple items in local storage?
           const cart = localStorage.getItem(JSON.parse("cart"))
           if(cart){
            localStorage.setItem("cart", JSON.stringify([...cart, {productId, productName, productPrice, quantity}]))
           }else{
            localStorage.setItem("cart", JSON.stringify([{productId, productName, productPrice, quantity}]))
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
 
export default AddToCart;
