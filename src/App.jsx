import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
