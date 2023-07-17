import React from "react";
import "../css/Checkout.css";
import Subtotal from "./Subtotal";
import { useUser } from "./UserLogin";
import CheckoutProduct from "./CheckoutProduct";
function Checkout({ items, removeItem, redirect }) {
  function onload() {
    redirect(true);
  }
  console.log(items);
  const user = useUser();

  return (
    <div className="checkout" onLoad={onload}>
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://amazon-clone-with-stripe-payment.netlify.app/images/OCC_Amazon1._CB423492668_.jpg"
          alt="banner"
        />
        <div>
          <h3>{user ? "Hello " + user?.email : null}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
        </div>
        <CheckoutProduct basket={items} removeItem={removeItem} />
      </div>
      <div className="checkout__right">{<Subtotal basket={items} />}</div>
    </div>
  );
}

export default Checkout;
