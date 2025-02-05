import React from "react";
import Card from "../daisyui/Card";
import { useQuery } from "react-query";
import { supabase } from "../../utils/SupaClient";
import { Link } from "react-router-dom";

const ProductList = () => {
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

  const { data: getProduct, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await supabase.from("product").select();
      return res.data;
    },
  });

  return (
    <div className="my-10">
      <h2 className="text-5xl text-center font-bold dark:text-white">
        Our Product
      </h2>
      <div className="grid grid-cols-4 gap-4 mt-10 max-lg:grid-cols-1 max-lg:gap-2 dark:text-white">
        {isLoading ? (
          <div className="flex justify-center col-span-4">
            <span className="loading loading-bars loading-md"></span>
          </div>
        ) : (
          getProduct?.slice(0, 8).map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="block">
              <Card
                title={truncateText(item.product_name, 20)}
                image={item.image}
                desc={item.desc}
                price={formatRupiah(item.price)}
              />
            </Link>
          ))
        )}
      </div>
      <div className="text-center mt-8">
        <Link to={"/product"} className="btn btn-warning text-white">
          See More
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
