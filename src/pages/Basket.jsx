import React, { useEffect } from "react";
import { useBasket } from "../utils/store/useBasket";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/daisyui/Card";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { useAuth } from "../utils/store/useAuth";
import { Helmet } from "react-helmet-async";

const Basket = () => {
  const { fetchBasket, basket, handlePayment } = useBasket();
  const { user } = useAuth();
  useEffect(() => {
    fetchBasket(user.id);
  }, [fetchBasket]);

  const totalAmount = basket.reduce((acc, item) => acc + item.price, 0);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div>
      <Helmet>
        <title>Basket{basket.length > 0 ? `-${basket.length}` : ""}</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <Header />
        <motion.h2
          className="w-full text-center text-4xl font-bold mt-8 dark:text-white"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          My Basket
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row items-center sm:justify-between px-8 mt-4"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Link
            to="/"
            className="btn bg-yellow-400 hover:bg-yellow-500 text-white w-full sm:w-auto text-center"
          >
            Back to Home
          </Link>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 p-8"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
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
        </motion.div>
        <div className="text-center sm:text-end m-8">
          <motion.h3
            className="text-2xl font-semibold dark:text-white"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Total: {totalAmount.toFixed()}
          </motion.h3>
          <motion.button
            className="btn bg-yellow-400 text-white my-4 w-full sm:w-auto"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onClick={() => handlePayment()}
          >
            Checkout
          </motion.button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Basket;
