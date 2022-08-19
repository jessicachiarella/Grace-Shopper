import React, {useState} from "react";
import { editQuantity, getMyInfo, getUnpurchasedCart, getOrderItemByCart } from "../api";

const EditCart= ({ cart, setCart}) => {
    const [quantity, setQuantity] = useState("");

  async function handleEdit(event) {
    event.preventDefault();
    const orderItem = await getOrderItemByCart(cart.cartId)
    await editQuantity(orderItem.id, quantity);
    const user = await getMyInfo(localStorage.getItem("token"))
    const result = await getUnpurchasedCart(user.id);
    console.log(result, "result from edit")
    setCart(result);
  }
  return (
    <form onSubmit={handleEdit}>
    <div>
      <input
        id="EditQuantity"
        placeholder="quantity"
        value={quantity}
        onChange={(event) => {
          setQuantity(event.target.value);
        }}
      />
    </div>
    <button id="Ebutton" type="Submit">
      UPDATE
    </button>
  </form>
  );
};

export default EditCart;