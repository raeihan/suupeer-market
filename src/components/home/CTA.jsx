import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section
      id="cta"
      className="my-20 bg-yellow-200"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://www.winpay.id/wp-content/uploads/2024/02/beda-ecommerce-marketplace-online-shop.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center gap-4 px-6 py-16 sm:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400 text-center">
          Interested in shopping here?
        </h2>
        <p className="text-white text-center text-sm sm:text-base lg:text-lg">
          Please click the button
        </p>
        <Link
          to={"/product"}
          className="btn bg-yellow-400 hover:bg-yellow-500 border-none text-gray-900 px-6 py-3 text-sm sm:text-base rounded-lg"
        >
          See More
        </Link>
      </div>
    </section>
  );
};

export default CTA;
