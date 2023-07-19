import React, { useState } from "react";
import "../css/Product.css";
import Rating from "./Rating";
import { ZoomableImage } from "./ZoomableComponents";
import Addedtocart from "./Addedtocart";

var i = 0;
function Product(props) {
  const storedItem = JSON.parse(localStorage.getItem("item")) || [];

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

    const doesNoteExist = storedItem.some((note) => note.id === updatedData.id);
    if (doesNoteExist) {
      props.onRemoveToBasket(updatedData);
    } else {
      props.onAddToBasket(updatedData);
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
        <div onClick={addToBasket}>
          <Addedtocart product={props} />
        </div>
      </div>
    </div>
  );
}

export default Product;
