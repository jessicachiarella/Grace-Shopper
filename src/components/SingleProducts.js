import React, {useState, useEffect} from "react";
import { getProductById } from "../api/index";
import { useParams } from "react-router-dom";


const SingleProducts = () => {
  const { id } = useParams();
  // console.log(params, "this is our params")
  console.log(id, "this is our id")
    const [singleProduct, setSingleProduct] = useState([]);
  useEffect(() => {
    getProductById(id).then((results) => {
      console.log(results, "this is our results")
      setSingleProduct(results);
    });
  }, []);

  return (

    <div id="SingleProductPage">
        <div>
                return (
                  <div id="Product" key={singleProduct.id}>
                    <h2 id="name">{element.name}</h2>
                    <p id="price">${element.price}</p>
                    <img src={image} alt={element.name} width={200}/>
                  </div>
                )
        </div>
    </div>
  );
};

export default SingleProducts;