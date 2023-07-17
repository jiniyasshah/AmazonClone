import React from "react";
import "../css/Home.css";
import Product from "./Product";
import Items from "./Items";

function Home({ onAddToBasket, redirect }) {
  function onload() {
    redirect(false);
  }
  // const [item, setitem] = useState([...Items]);

  const rows = [
    Items.slice(0, 2), // First row with 2 items
    Items.slice(2, 5), // Second row with 3 items
    Items.slice(5, 6), // Third row with 1 item
  ];
  return (
    <div className="home" onLoad={onload}>
      <div className="home__container">
        <img
          className="home__image"
          src="https://amazon-clone-with-stripe-payment.netlify.app/images/banner.jpg"
          alt="amazonbanner"
        />

        {rows.map((row, rowIndex) => (
          <div className="home__row" key={rowIndex}>
            {row.map((item) => (
              <Product
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
                onAddToBasket={onAddToBasket}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
