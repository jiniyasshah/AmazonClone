import React from "react";
import "../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal({ basket }) {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <>
              <p>
                Subtotal ({basket.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" />
                This order contains a gift.
              </small>
            </>
          );
        }}
        decimalScale={2}
        value={basket.reduce((amount, item) => item.price + amount, 0)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <button className="btn btn3">Proceed To Checkout</button>
    </div>
  );
}

export default Subtotal;
