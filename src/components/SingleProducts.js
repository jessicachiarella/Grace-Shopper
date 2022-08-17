import React, { useState, useEffect } from "react";
import { getProductById } from "../api/index";
import { useParams } from "react-router-dom";

const SingleProducts = () => {
  const { id } = useParams();
  // console.log(params, "this is our params")
  console.log(id, "this is our id");
  const [singleProduct, setSingleProduct] = useState([]);
  useEffect(() => {
    getProductById(id).then((results) => {
      console.log(results, "this is our results");
      setSingleProduct(results);
    });
  }, []);
  console.log(singleProduct, "this is singleproduct");
  console.log(singleProduct.products, "this is the .name");
  return (
    <div id="SingleProductPage">
      <div>
        
        {singleProduct && singleProduct.products ? (
          <div id="Product" key={singleProduct.products.id}>
            <h2 id="name">{singleProduct.products.name}</h2>
            <p id="description">{singleProduct.products.description}</p>
            <p id="price">${singleProduct.products.price}</p>
            {singleProduct.products.inStock ? <p id="inStock">In stock</p> :  <p id="inStock">Out of stock</p> } 
            <img src={singleProduct.products.image_url} width={400} />
            <button id="checkoutButton">Add to Cart</button>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default SingleProducts;
