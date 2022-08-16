import React, {useState, useEffect} from "react";
import { getProductById } from "../api/index";
import { useParams } from "react-router-dom";


const SingleProducts = () => {
    const [singleProduct, setSingleProduct] = useState([]);
  useEffect(() => {
    getProductById().then((results) => {
      setSingleProduct(results);
    });
  }, []);

  return (
    <div id="SingleProductPage">
        <div>
          {singleProduct.length ? (
            singleProduct.map((element) => {
              const { id, name, description, price, categoryId, image_url, inStock } = element;
              console.log(element, "this is the product")
              const image = element.image_url;
              console.log(image, "this is image")
              if (element.productId) {
                return (
                  <div id="Product" key={element.id}>
                    <h2 id="name">{element.name}</h2>
                    <p id="price">${element.price}</p>
                    <img src={image} alt={element.name} width={200}/>
                  </div>
                );
              }
            })
          ) : (
            <div> Loading your Products... </div>
          )}
        </div>
    </div>
  );
};

export default SingleProducts;