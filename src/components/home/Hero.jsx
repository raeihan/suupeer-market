import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <section id="home" className="pt-10 sm:pt-16 lg:pt-8 max-lg:pt-24">
      <div className="bg-yellow-200 rounded-md h-auto p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
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
            <motion.h1
              className="dark:text-black font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] drop-shadow-sm"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              Welcome to <span className="text-yellow-400">Suupeer!</span>Market
            </motion.h1>
            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="dark:text-black mt-4 text-lg sm:text-xl lg:text-2xl tracking-[-0.02em] drop-shadow-sm"
            >
              Find some products that you want to need
            </motion.p>
            <motion.div
              className="dark:text-black mx-auto mt-6 flex justify-center lg:justify-start space-x-5"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Link
                to={"/product"}
                className="btn border-none bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-6 py-3 text-sm sm:text-base"
              >
                Buy Now!
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="./hero1.svg"
            className="max-w-full h-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
            alt="Hero Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
