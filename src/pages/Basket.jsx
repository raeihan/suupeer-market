import React, { useEffect } from "react";
import { useBasket } from "../utils/store/useBasket";
import { Link } from "react-router-dom";
import Card from "../components/daisyui/Card";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";

const Basket = () => {
  const { fetchBasket, basket } = useBasket();

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  const totalAmount = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <Header />
      <h2 className="text-center text-4xl font-bold mt-8">My Basket</h2>
      <div className="flex pl-8 mt-4">
        <Link to="/" className="btn bg-yellow-400 text-white">Back to Home</Link>
      </div>
      <div className="grid grid-cols-5 justify-center gap-5 p-8">
        {basket?.map((item) => (
          <Card
            key={item.id}
            idProduct={item.id_product}
            title={item.product_name}
            image={item.product.image}
            price={item.price}
            count={item.count}
            isBasketPage={true}
          />
        ))}
      </div>
      <div className="text-end m-8">
        <h3 className="text-2xl font-semibold">Total: {totalAmount.toFixed()}</h3>
        <button className="btn bg-yellow-400 text-white my-4">Checkout</button>
      </div>
      <Footer />
    </div>
  );
};

export default Basket;
