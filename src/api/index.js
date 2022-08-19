const API_URL = "http://localhost:4000/api";
// const API_URL = "https://protected-journey-92520.herokuapp.com/api";

export async function LoginPerson(event) {
    try {
        const loginEmail = event.target[0].value;
        const loginPassword = event.target[1].value;
        const response = await fetch(`${API_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });
        const result = await response.json();
        return result;
      
    } catch (error) {
        throw error
    }
}

export async function RegisterPerson(event) {
    try {
      const registerEmail = event.target[0].value;
      const registerPassword = event.target[1].value;
      const registerFullName = event.target[2].value;
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: registerFullName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error
    }
  }

  export async function getAllPlants() {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const routines = await response.json();
    return routines;
}


  export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();
    return product
  }
  
export async function getOrderHistory(userId, token) {
  const response = await fetch(`${API_URL}/orderHistory/${userId}`, 
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const history = await response.json();
  console.log(history, "this is history from my api index")
  return history;
}

export async function getMyInfo (token) {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export async function addToCart(cartId, productId, name, quantity, price){
    const response = await fetch(`${API_URL}/orderItems/${cartId}/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          name: name, 
          quantity: quantity,
          price: price
        }),
      });
      const result = await response.json();
      return result; 
}

export async function getCart(userId){
  const response = await fetch(`${API_URL}/cart/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result; 
}  

export async function createNewCart(userId){
  const response = await fetch(`${API_URL}/cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result; 
}  

export async function getUnpurchasedCart(userId){
  const response = await fetch(`${API_URL}/cart/unpurchasedCart/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  console.log(result, " this  is the result from unpur")
  return result; 

}  

export async function editIsPurchased(cartId){
  console.log(cartId, "this is cartId")
  const response = await fetch(`${API_URL}/cart/${cartId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("am i here")
  const result = await response.json();
  console.log(result, "this is result")
  return result; 

}  

export async function createOrderHistory(cartId){
    console.log(cartId, "This is my cartId from my create order history function in my api")
  const response = await fetch(`${API_URL}/orderHistory/${cartId}/addToOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result; }
