import React, {useState} from "react";
import { editQuantity, getMyInfo, getUnpurchasedCart, getOrderItemByCart } from "../api";

const EditCart= ({ cart, setCart, isLoggedIn, itemId }) => {
    const [quantity, setQuantity] = useState("");

  async function handleEdit(event) {
    event.preventDefault();
    //passed down logged in state so we can check for guest user
    if(isLoggedIn){ 
      const user = await getMyInfo(localStorage.getItem("token"))
      if(localStorage.getItem("email") === user.email){
        const orderItem = await getOrderItemByCart(cart.cartId)
        await editQuantity(orderItem.id, quantity);
        const result = await getUnpurchasedCart(user.id);
        setCart(result);
      }else{
        alert("You must be logged in to perform this function!");
      }
    } else {
      const cartProducts = JSON.parse(localStorage.getItem("cart"));
      const newCartProducts = cartProducts.map((element) => {
        if(element.id === itemId){
        element.quantity = parseInt(quantity)
        }
        return element
      }
      )
      const newCart = localStorage.setItem("cart", JSON.stringify(newCartProducts));
      setCart(newCart)

    }
    
  }
  return (
    <form onSubmit={handleEdit}>
    <div>
      <input
        id="EditQuantity"
        value={quantity}
        size="2"
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