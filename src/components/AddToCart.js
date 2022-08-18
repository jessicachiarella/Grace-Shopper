import React, { useEffect, useState } from "react";

import {
  addToCart,
  getMyInfo,
  getCart,
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
      const currentCart = await getCart(userId);
      console.log(currentCart, "this is our current cart!!");
      console.log(currentCart.cartId, "This is my cart Id");
      console.log(
        currentCart.isPurchased,
        "This is my current cart is purchased?"
      );
      if (currentCart.cartId && !currentCart.isPurchased) {
        const addedItem = await addToCart(
          currentCart.cartId,
          productId,
          productName,
          quantity,
          productPrice
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
          productPrice
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
          JSON.stringify([{ id:productId, productName, productPrice, quantity }])
        );
        setInCart(true)
      } else {
        const cartProducts = JSON.parse(localStorage.getItem("cart"));
        cartProducts.push({ id:productId, productName, productPrice, quantity });
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
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <button id="addToCart" type="Submit">
              ADD TO CART
            </button>
          </form>
        )

        // isLoggedIn && cart && cart.products && cart.products.length
        //   ? cart.products.includes(productId)
        //   cart.products.map((product) => {
        //     console.log(product, "This is our product after our map function")
        //       return (product.id === productId ? (
        //         <div key={`Product${product.id}`}>
        //           <p>Item is in your cart!</p>
        //         </div>
        //       ) : (

        //       );
        //     })
        //   : null //local storage
        //   cart.map((cartProducts) => {
        //     <form onSubmit={handleSubmit}>
        //       <button id="addToCart" type="Submit">
        //         ADD TO CART
        //       </button>
        //     </form>;
        //   })
      }
    </div>
  );
};

export default AddToCart;
