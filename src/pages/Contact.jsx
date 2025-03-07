import React from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { motion } from "framer-motion";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d795.3055150271998!2d107.18096235039818!3d-6.287186721878762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b445d8375b1%3A0x2be0e0c5314813b1!2sPesantren%20SMP%20dan%20SMA%20Rabbaanii%20Islamic%20School!5e0!3m2!1sid!2sid!4v1736127121450!5m2!1sid!2sid"
          width="600"
          height="450"
          allowFullScreen="true"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <FloatingButton />
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
