import React from "react";
import { Link } from "react-router-dom";
import Card from "../daisyui/Card";

const AllProduct = ({ products }) => {
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

  return (
    <section id="all-product" className="w-full lg:w-4/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products?.map((item) => (
          <div
            key={item.id}
            className="dark:text-white bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${item.id}`} className="block h-full">
              <Card
                title={truncateText(item.product_name, 20)}
                image={item.image}
                desc={truncateText(item.desc, 50)}
                price={formatRupiah(item.price)}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
