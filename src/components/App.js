import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import '../style/App.css';
import {
  Login,
  Logout,
  Register,
//   AddToCart,
//   Cart,
  Care,
  Checkout,
//    Congratulations,
//   DeleteFromCart,
//   EditCart,
  Header,
  Home,
  Account,
  RenderAllPlants,
  RenderDivas,
  RenderGreenThumbs,
  RenderPlantNoobs,
  RenderPots,
  SingleProducts
} from "./";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
        }
      }, []);

      return(
        <div>
            <Header isLoggedIn={isLoggedIn}/>
            {isLoggedIn ? (
                <Routes>


                    <Route path="/users/Logout" element={<Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/Account" element={<Account/>}/>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/Care" element={<Care/>}/>
                    

                    {/* <Route path="/Cart" element={<Cart cart={cart} setCart={setCart}/>}/> */}
                    {/* <Route path="/Confirmation" element={<Confirmation/>}/> */}

                    {/* <Route path="/Congratulations" element={<Congratulations/>}/> */} 
                    <Route path="/RenderAllPlants" element={<RenderAllPlants/>}/>
                    <Route path="/RenderDivas" element={<RenderDivas/>}/>
                    <Route path="/RenderGreenThumbs" element={<RenderGreenThumbs/>}/>
                    <Route path="/RenderPlantNoobs" element={<RenderPlantNoobs/>}/>
                    <Route path="/RenderPots" element={<RenderPots/>}/>
                    <Route path="/Checkout" element={<Checkout setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/RenderPots/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderAllPlants/:id" element={<SingleProducts cart={cart} setCart={setCart}isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderPlantNoobs/:id" element={<SingleProducts cart={cart} setCart={setCart}isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderGreenThumbs/:id" element={<SingleProducts cart={cart} setCart={setCart}isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderDivas/:id" element={<SingleProducts cart={cart} setCart={setCart}isLoggedIn={isLoggedIn}/>}/>
                </Routes>
            ):(
                <Routes>
                    <Route path="/users/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/users/Register" element={<Register setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/Care" element={<Care/>}/>
                    
                    {/* <Route path="/Cart" element={<Cart/>}/>
                    {/* <Route path="/Congratulations" element={<Congratulations/>}/> */} 
                    <Route path="/RenderAllPlants" element={<RenderAllPlants/>}/>
                    <Route path="/RenderDivas" element={<RenderDivas/>}/>
                    <Route path="/RenderGreenThumbs" element={<RenderGreenThumbs/>}/>
                    <Route path="/RenderPlantNoobs" element={<RenderPlantNoobs/>}/>
                    <Route path="/RenderPots" element={<RenderPots/>}/>
                    <Route path="/Checkout" element={<Checkout setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/RenderPots/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderAllPlants/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderPlantNoobs/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderGreenThumbs/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/RenderDivas/:id" element={<SingleProducts cart={cart} setCart={setCart} isLoggedIn={isLoggedIn}/>}/>
                </Routes>
            )}

        </div>
      )
}
export default App;