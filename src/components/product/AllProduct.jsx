import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../daisyui/Card";

const AllProduct = ({
  products,
  isLoading,
  searchProduct,
  setSearchProduct,
}) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section id="all-product" className="w-full lg:w-4/5">
      <motion.div
        className="w-full mb-4"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search your Product"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </motion.div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products?.length > 0 ? (
            products.map((item) => (
              <Card
                key={item.id}
                idProduct={item.id}
                title={truncateText(item.product_name, 20)}
                image={item.image}
                desc={truncateText(item.desc, 50)}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-center">Product Unknown</p>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProduct;
