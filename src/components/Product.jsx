import React from "react";
import "../css/Product.css";
import Rating from "./Rating";
import { ZoomableImage } from "./ZoomableComponents";

var i = 0;
function Product(props) {
  const storedUID = localStorage.getItem("uid");
  const addToBasket = async (event) => {
    const updatedData = {
      uid: storedUID,
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
      rating: props.rating,
      del: i++,
    };
    try {
      props.onAddToBasket(updatedData);
      const response = await fetch("https://amazonapi-cnbd.onrender.com/customerData", {
        method: "post",
        headers: {
          Origin: "http://localhost:3001/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      console.log(response);
      // Handle the response as needed
    } catch (error) {
      // Handle error
    }

    // Execute prop.addList after updating data
    event.preventDefault();
    return updatedData;
    // Return updatedData from setData callback
  };

  return (
    <div className="home__row">
      <div className="product">
        <div className="product__info">
          <p>{props.title}</p>
          <p className="product__price">
            <small>$</small>
            <strong>{props.price}</strong>
          </p>
          <div className="product__rating ">
            <Rating rating={props.rating} />
          </div>
        </div>
        <ZoomableImage
          className="product__image"
          imageUrl={props.image}
          alt="products"
        />

        <button className="btn btn3" onClick={addToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
