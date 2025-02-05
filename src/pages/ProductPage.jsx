import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import AllProduct from "../components/product/AllProduct";
import Sidebar from "../components/product/Sidebar";
import { useQuery } from "react-query";
import { supabase } from "../utils/SupaClient";
import { motion } from "framer-motion";
import FloatingButton from "../components/FloatingButton";

const ProductPage = () => {
  const [category, setCategory] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();
  const [selectParams, setSelectParams] = useSearchParams();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchProduct, setSearchProduct] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const params = {
      ...Object.fromEntries(searchParams),
      search: searchProduct,
    };
    if (!searchProduct) delete params.search;
    setSearchParams(params);
  }, [searchProduct, setSearchParams]);

  const paramsData = {
    category: selectParams.getAll("k"),
    search: searchParams.get("search"),
  };

  const { data: totalProducts, isLoading } = useQuery({
    queryKey: ["totalProducts", searchQuery, category, paramsData.search],
    queryFn: async () => {
      let query = supabase
        .from("product")
        .select("*", { count: "exact", head: true });

      if (category.length > 0) {
        query = query.in("product_style", category);
      }

      if (searchQuery) {
        query = query.ilike("product_name", `%${searchQuery}%`);
      }

      const { count, error } = await query;

      if (error) {
        console.error("Error fetching total products:", error);
        return 0;
      }

      return count;
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", sortBy, category, searchQuery, currentPage, paramsData.search],
    queryFn: async () => {
      const from = (currentPage - 1) * productsPerPage;
      const to = from + productsPerPage - 1;

      let query = supabase.from("product").select();

      if (sortBy === "expensive") {
        query = query.order("price", { ascending: false });
      } else if (sortBy === "cheapest") {
        query = query.order("price", { ascending: true });
      } else if (sortBy === "az") {
        query = query.order("product_name", { ascending: true });
      } else if (sortBy === "za") {
        query = query.order("product_name", { ascending: false });
      }

      if (category.length > 0) {
        query = query.in("product_style", paramsData.category);
      }

      if (paramsData.search) {
        query = query.ilike("product_name", `%${paramsData.search}%`);
      }

      query = query.range(from, to);

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        return [];
      }

      return data;
    },
  });

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
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
      className="bg-gray-50 dark:bg-gray-900 max-lg:pt-24"
    >
      <Header />
      <main className="m-4 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-4">
          <Sidebar setSortBy={setSortBy} setCategory={setCategory} />
          <AllProduct
              products={products}
              onProductClick={handleProductClick}
              setSearchProduct={setSearchProduct}
              setSearch={searchProduct}
              isLoading={isLoading}
            />
        </div>
        <motion.div
          className="flex justify-center items-center my-4 gap-2"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <button
            className="btn btn-outline mx-1"
            disabled={currentPage === 1 || isLoadingProducts}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            {"<"}
          </button>
          <span className="mx-2 items-center text-sm md:text-base">
            {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline mx-1"
            disabled={currentPage === totalPages || isLoadingProducts}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {">"}
          </button>
        </motion.div>
      </main>
      <FloatingButton />
      <Footer />
    </motion.div>
  );
};

export default ProductPage;
