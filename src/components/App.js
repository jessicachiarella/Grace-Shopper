import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import '../style/App.css';
import {
//   Login,
//   Logout,
//   Register,
//   AddToCart,
//   Cart,
//   Confirmation,
//   DeleteFromCart,
//   EditCart,
//   Header,
//   Home,
//   OrderHistory,
//   RenderAllPlants,
//   RenderDivas,
//   RenderGreenThumbs,
//   RenderPlantNoobs,
//   RenderPots,
//   SingleProducts
} from ".";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
        }
      }, []);

      return(
        <div>
            {/* <Header> </Header> */}
            <div>Hello, world!</div>
            if(isLoggedIn){
                <Routes>
                    {/* <Route path="/Home" element={<Home/>}/>
                    <Route path="/users/Logout" element={<Logout/>}/>
                    <Route path="/OrderHistory" element={<OrderHistory/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Confirmation" element={<Confirmation/>}/>
                    <Route path="/RenderAllPlants" element={<RenderAllPlants/>}/>
                    <Route path="/RenderDivas" element={<RenderDivas/>}/>
                    <Route path="/RenderGreenThumbs" element={<RenderGreenThumbs/>}/>
                    <Route path="/RenderPlantNoobs" element={<RenderPlantNoobs/>}/>
                    <Route path="/RenderPots" element={<RenderPots/>}/>
                    <Route path="/SingleProducts" element={<SingleProducts/>}/> */}
                </Routes>
            }:{
                <Routes>
                    {/* <Route path="/Home" element={<Home/>}/>
                    <Route path="/users/Register" element={<Register/>}/>
                    <Route path="/users/Login" element={<Login/>}/>
                    <Route path="/Cart" element={<Cart/>}/>
                    <Route path="/Confirmation" element={<Confirmation/>}/>
                    <Route path="/RenderAllPlants" element={<RenderAllPlants/>}/>
                    <Route path="/RenderDivas" element={<RenderDivas/>}/>
                    <Route path="/RenderGreenThumbs" element={<RenderGreenThumbs/>}/>
                    <Route path="/RenderPlantNoobs" element={<RenderPlantNoobs/>}/>
                    <Route path="/RenderPots" element={<RenderPots/>}/>
                    <Route path="/SingleProducts" element={<SingleProducts/>}/> */}
                </Routes>
            }

        </div>
      )
}
export default App;