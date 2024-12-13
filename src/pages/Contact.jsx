import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { motion } from "framer-motion";

const Contact = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col pt-10 bg-white dark:bg-gray-800 max-lg:pt-24">
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
          className="mb-14 px-4 sm:px-8 lg:px-16"
        >
          <motion.h1
            className="text-yellow-400 font-display text-4xl font-bold text-center mb-6 tracking-[-0.02em] drop-shadow-sm"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-gray-700 leading-relaxed text-center mb-8 dark:text-gray-300 text-lg tracking-[-0.02em]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Berikut adalah informasi kontak kami. Jangan ragu untuk menghubungi
            kami jika Anda memiliki pertanyaan atau memerlukan bantuan.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ContactCard
              icon="envelope"
              title="Email"
              text="suupeermarket@gmail.com"
              link="mailto:suupeermarket@gmail.com"
            />
            <ContactCard
              icon="phone"
              title="Telepon/WhatsApp"
              text="+62 812-3456-789"
              link="tel:+628123456789"
            />
            <ContactCard
              icon="map-marker-alt"
              title="Alamat"
              text="Jl. Jatuh No. 123, Jakarta, Indonesia"
            />
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

const ContactCard = ({ icon, title, text, link }) => {
  return (
    <motion.div
      className="flex items-start gap-4 bg-yellow-100 p-4 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-300"
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
    >
      <div className="bg-yellow-400 text-white p-3 rounded-full"></div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        {link ? (
          <a href={link} className="text-yellow-400 hover:underline">
            {text}
          </a>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Contact;
