import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Sidebar = ({ setSortBy, setCategory }) => {
  const [selectFilter, setSelectFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectParams, setSelectParams] = useSearchParams();

  const handleFilteredChange = (filter) => {
    setSelectFilter(filter);
    setSortBy(filter);
  };

  const handleResetFilter = () => {
    setSelectFilter("");
    setSortBy("");
    setSelectedCategory([]);
    setCategory([]);
  };

  const handleCategory = (category) => {
    const updateCategory = selectedCategory.includes(category)
      ? selectedCategory.filter((cat) => cat !== category)
      : [...selectedCategory, category];

    setSelectedCategory(updateCategory);
    setSelectParams({ k: updateCategory });
    setCategory(updateCategory);
  };

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  useEffect(() => {
    const params = selectParams.getAll("k");
    setSelectedCategory(params);
    setCategory(params);
  }, []);

  return (
    <aside className="w-full lg:w-1/5 bg-white dark:bg-gray-800 p-4 rounded-lg">
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
        className="mb-14"
      >
        <motion.div
          className="flex flex-col items-center dark:text-white"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className="text-2xl font-semibold mb-4">Filter Product</h2>
          <label className="flex items-center gap-2 my-2">
            <input
              type="radio"
              name="radio-product"
              className="radio radio-warning"
              checked={selectFilter === "expensive"}
              onChange={() => handleFilteredChange("expensive")}
            />
            Expensive Price
          </label>
          <label className="flex items-center gap-2 my-2">
            <input
              type="radio"
              name="radio-product"
              className="radio radio-warning"
              checked={selectFilter === "cheapest"}
              onChange={() => handleFilteredChange("cheapest")}
            />
            Cheapest Price
          </label>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl mt-6 font-semibold">Sort by Name</h2>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="radio-product"
                className="radio radio-warning"
                checked={selectFilter === "az"}
                onChange={() => handleFilteredChange("az")}
              />
              A-Z
            </label>
            <label className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name="radio-product"
                className="radio radio-warning"
                checked={selectFilter === "za"}
                onChange={() => handleFilteredChange("za")}
              />
              Z-A
            </label>
          </div>
          <button
            className="btn btn-warning mt-4 rounded-lg px-4 py-2"
            onClick={handleResetFilter}
          >
            Reset Filter
          </button>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mt-4 dark:text-white"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className="text-2xl font-semibold mb-3">Product Category</h2>
          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={selectedCategory.includes("makanan")}
              onChange={() => handleCategory("makanan")}
            />
            Food
          </label>
          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={selectedCategory.includes("minuman")}
              onChange={() => handleCategory("minuman")}
            />
            Drink
          </label>
          <label className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="checkbox checkbox-warning"
              checked={selectedCategory.includes("kosmetik")}
              onChange={() => handleCategory("kosmetik")}
            />
            Cosmetics
          </label>
        </motion.div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
