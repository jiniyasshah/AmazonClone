import React from "react";

import "../css/CheckoutProduct.css";
import Rating from "./Rating";
function CheckoutProduct({ basket, removeItem }) {
  return (
    <div className=".checkoutProduct">
      {basket.map((bask) => {
        const removeBasket = async () => {
          removeItem(bask);
        };
        return (
          <div className="checkoutProduct">
            <img
              className="checkoutProduct__image"
              src={bask.image}
              alt="items"
            />
            <div className="checkoutProduct__info">
              <p className="checkoutProduct__title">{bask.title}</p>
              <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{bask.price}</strong>
              </p>
              <div className="checkoutProduct__rating">
                <Rating rating={bask.rating} fontSize="small" />
              </div>
              <button className="btn btn3" onClick={removeBasket}>
                Remove from Basket
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutProduct;
