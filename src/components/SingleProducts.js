import React, { useState, useEffect } from "react";
import { getProductById } from "../api/index";
import { useParams } from "react-router-dom";
import AddToCart from "./AddToCart";

const SingleProducts = ({ cart, setCart, isLoggedIn }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  useEffect(() => {
    getProductById(id).then((results) => {
      setSingleProduct(results);
    });
  }, []);

  return (
    <div id="SingleProductPage">
      <div>
        {singleProduct && singleProduct.products ? (
          <div id="Product" key={singleProduct.products.id}>
            <h2 id="name">{singleProduct.products.name}</h2>
            <p id="description">{singleProduct.products.description}</p>
            <p id="price">${singleProduct.products.price}</p>
            {singleProduct.products.inStock ? (
              <p id="inStock">In stock</p>
            ) : (
              <p id="inStock">Out of stock</p>
            )}
            <img src={singleProduct.products.image_url} width={400} />
            <>
              <AddToCart
                cart={cart}
                setCart={setCart}
                productId={singleProduct.products.id}
                productName={singleProduct.products.name}
                productPrice={singleProduct.products.price}
                image_url={singleProduct.products.image_url}
                isLoggedIn={isLoggedIn}
              />
            </>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SingleProducts;
