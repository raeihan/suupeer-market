import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/home/Hero";
import ProductList from "../components/home/ProductList";
import WhyChoose from "../components/home/WhyChoose";
import SupportPayment from "../components/home/SupportPayment";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <Header />
      <div className="mx-5">
        <Hero />
        <ProductList />
        <WhyChoose />
        <SupportPayment />
        <CTA />
        <FloatingButton />
      </div>
      <Footer />
    </>
  );
};

export default Home;
