import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { supabase } from "../utils/SupaClient";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], async () => {
    const { data, error } = await supabase
      .from("product")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      throw error;
    }

    return data;
  });

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Failed to load product details. Please try again later.</p>;
  }

  return (
    <>
      <Helmet>
        <title>Suupeer!-{product.product_name}</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <Header />
      <div className="container mx-auto p-10">
        <button className="btn btn-outline mb-6" onClick={() => navigate(-1)}>
          <h2>{"<"}</h2>
        </button>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.product_name}
            className="w-64 h-64 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              {product.product_name}
            </h1>
            <p className="text-xl text-gray-700 dark:text-white">
              Rp {product.price}
            </p>
            <p className="text-gray-600 mt-2 dark:text-white">
              <strong>Jenis:</strong> {product.product_style}
            </p>
            <p className="text-gray-600 dark:text-white">
              <strong>Stok:</strong> {product.stock}
            </p>
            <p className="text-gray-600 mt-4 dark:text-white">{product.desc}</p>
            <p className="text-gray-500 mt-2 dark:text-white">
              <strong>Added/Updated:</strong>{" "}
              {new Date(
                product.updated_at || product.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <FloatingButton />
      <Footer />
    </>
  );
};

export default ProductDetail;
