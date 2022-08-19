import React from "react";
import { deleteProduct, getMyInfo, getUnpurchasedCart, getOrderItemByCart } from "../api";

const DeleteFromCart= ({ cart, setCart}) => {
  async function handleDelete(event) {
    event.preventDefault();
    const orderItem = await getOrderItemByCart(cart.cartId)
    await deleteProduct(orderItem.id);
    const user = await getMyInfo(localStorage.getItem("token"))
    const result = await getUnpurchasedCart(user.id);
    console.log(result, "result from delete")
    setCart(result);
  }
  return (
    <form onSubmit={handleDelete}>
      <button id="deleteButton" type="Submit">
        DELETE
      </button>
    </form>
  );
};

export default DeleteFromCart;