import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CounterApp from "./pages/CounterApp";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import { useAuth } from "./utils/store/useAuth";
import ProfilePage from "./pages/ProfilePage";
import AuthRoute from "./auth/AuthRoute";
import UserRoute from "./auth/UserRoute";
import Basket from "./pages/Basket";
import { useBasket } from "./utils/store/useBasket";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  const { fetchUser, loading } = useAuth();

  const {fetchBasket} = useBasket()

  useEffect(() => {
    fetchUser();
    fetchBasket()
  }, [fetchUser, fetchBasket]);

  if (loading) {
    return (
      <h2 className="h-screen flex justify-center items-center">Loading...</h2>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/counter" element={<CounterApp />} />
        <Route path="/basket" element={<Basket />} />
        <Route element={<UserRoute />}>
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/profileupdate" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
