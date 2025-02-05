import React from "react";
import Header from "../components/tailus/Header";
import Hero from "../components/home/Hero";
import ProductList from "../components/home/ProductList";
import WhyChoose from "../components/home/WhyChoose";
import SupportPayment from "../components/home/SupportPayment";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import FloatingButton from "../components/FloatingButton";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mx-5">
        <Hero />
        <ProductList />
        <WhyChoose/>
        <SupportPayment/>
        <CTA/>
        <FloatingButton/>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
