import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { motion } from "framer-motion";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet-async";

const About = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gradient-to-b bg-white dark:bg-gray-800">
        <main className="flex-grow px-6 py-10 sm:px-8 lg:px-16 max-lg:pt-28">
          <section className="max-w-7xl mx-auto">
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
              <motion.h1
                className="text-yellow-400 font-display text-3xl sm:text-4xl font-bold text-center mb-6 tracking-[-0.02em] drop-shadow-sm"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                About
              </motion.h1>
              <motion.p
                className="text-gray-700 leading-relaxed text-center mb-6 dark:text-gray-300 text-base sm:text-lg tracking-[-0.02em] drop-shadow-sm"
                variants={FADE_DOWN_ANIMATION_VARIANTS}
              >
                Welcome to{" "}
                <span className="font-semibold text-yellow-400">Suupeer!</span>
                <span className="font-semibold">Market</span>, your favorite
                shopping place for high-quality products and the latest styles.
                We are committed to providing the best online shopping
                experience with handpicked products that meet your needs.
              </motion.p>
              <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  className="flex flex-col items-center text-center dark:text-gray-300"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  <div className="relative w-48 sm:w-64 h-48 sm:h-64">
                    <img
                      src="./vision.svg"
                      alt="Our Vision"
                      className="rounded-lg shadow-lg w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mt-6">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg">
                    Become a trusted and leading online store in providing a
                    convenient and safe shopping experience.
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center text-center dark:text-gray-300"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  <div className="relative w-48 sm:w-64 h-48 sm:h-64">
                    <img
                      src="./mission.svg"
                      alt="Our Mission"
                      className="rounded-lg shadow-lg w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mt-6">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg">
                    Providing high-quality products at competitive prices as
                    well as satisfactory customer service.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </main>
        <FloatingButton />
        <Footer />
      </div>
    </>
  );
};

export default About;
