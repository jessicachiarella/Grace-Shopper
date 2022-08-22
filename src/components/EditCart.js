import React, {useState} from "react";
import { editQuantity, getMyInfo, getUnpurchasedCart, getOrderItemByCart } from "../api";

const EditCart= ({ cart, setCart, isLoggedIn, itemQuantity, itemId }) => {
    const [quantity, setQuantity] = useState("");

  async function handleEdit(event) {
    event.preventDefault();
    //passed down logged in state so we can check for guest user
    if(isLoggedIn){ 
      const user = await getMyInfo(localStorage.getItem("token"))
      console.log(localStorage.getItem("email"), "This is our email from local storage")
      console.log(user.email, "Thi is our email from getMyInfo")
      if(localStorage.getItem("email") === user.email){
        const orderItem = await getOrderItemByCart(cart.cartId)
        await editQuantity(orderItem.id, quantity);
        const result = await getUnpurchasedCart(user.id);
        console.log(result, "result from edit")
        setCart(result);
      }else{
        alert("You must be logged in to perform this function!");
      }
    } else {
      const cartProducts = JSON.parse(localStorage.getItem("cart"));
      const newCartProducts = cartProducts.map((element) => {
        const { id, quantity } = element;
        console.log(element.id, "This is our element id from our edit function")
        console.log(itemId, "This is our item id from our edit function")
        if(element.id === itemId){
        element.quantity = `${itemQuantity}`
        }
      }
      )
    localStorage.setItem("cart", JSON.stringify(newCartProducts));
    }
    
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