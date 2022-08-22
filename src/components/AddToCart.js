import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  addToCart,
  getMyInfo,
  getUnpurchasedCart,
  createNewCart,
  getProductById,
} from "../api";

const AddToCart = ({
  cart,
  setCart,
  productId,
  productName,
  productPrice,
  isLoggedIn,
  image_url
}) => {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    console.log(cart, "CART")
    if(cart && cart.products && cart.products.length){
        cart.products.forEach((product) => {
            if (product.id === productId) {
              setInCart(true);
            }
          });
    }
    
  }, [cart]);

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const user = await getMyInfo(token);
    const userId = user.id;
    if (isLoggedIn) {
      const currentCart = await getUnpurchasedCart(userId);
      console.log(currentCart, "this is our current unpurchased cart!!");
      if (currentCart.cartId) {
        const addedItem = await addToCart(
          currentCart.cartId,
          productId,
          productName,
          quantity,
          productPrice,
          image_url
        );
        console.log(addedItem, "addItem");
        const cartCopy = { ...cart };
        cartCopy.products.push(addedItem);
        setCart(cartCopy);
        setInCart(true);
      } else {
        const newCart = await createNewCart(userId);
        const addedItem = await addToCart(
          newCart.id,
          productId,
          productName,
          quantity,
          productPrice,
          image_url
        );
        newCart.products = [addedItem];
        setCart(newCart);
        setInCart(true);
      }
    } else {
      const cart = localStorage.getItem("cart");
      if (!cart) {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ id:productId, productName, productPrice, quantity, image_url }])
        );
        setInCart(true)
      } else {
        const cartProducts = JSON.parse(localStorage.getItem("cart"));
        cartProducts.push({ id:productId, productName, productPrice, quantity, image_url });
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        setInCart(true)
      }
    }
  }
  console.log(cart, "This is our cart!!");
  return (
    <div>
      {
        inCart ? (
          <div>
            <p>Item is in your cart!</p>
            <NavLink className="Links" to="/Cart">
              Take me to my cart!
            </NavLink>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <button id="addToCart" type="Submit">
              ADD TO CART
            </button>
          </form>
        )
      }
    </div>
  );
};

export default AddToCart;
