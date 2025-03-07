import React, { useEffect, useRef } from "react";
import { useAuth } from "../utils/store/useAuth";
import Header from "../components/tailus/Header";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const {
    full_name,
    email,
    username,
    avatar_url,
    logout,
    fetchUser,
    loading,
    user,
  } = useAuth();
  const navigate = useNavigate();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!user && !fetchedRef.current) {
      fetchUser();
      fetchedRef.current = true;
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout Success");
      window.location.href = "/";
    } catch (error) {
      alert("Logout Failed");
      console.error("Logout Error:", error);
    }
  };

  const handleEdit = () => {
    navigate("/profileupdate");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-400">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!full_name && !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-400">
        <p className="text-white text-lg">User data not found.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{full_name} Pages</title>
        <meta name="description" content="This page contain all products" />
        <meta name="keywords" content="Wonderful Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gradient-to-br bg-zinc-300 dark:bg-zinc-800 flex flex-col items-center py-12 px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-zinc-700 shadow-lg rounded-2xl max-w-lg sm:max-w-3xl w-full p-6 sm:p-8 lg:p-12 text-center sm:text-left relative">
          <Link to="/history" className="self-end sm:self-start">
            <svg
              height="40"
              width="40"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="btn btn-square bg-yellow-400 hover:bg-yellow-500 p-2 text-white border-0"
            >
              <path
                d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5c-1.798 0-3.493.453-4.975 1.251A10.55 10.55 0 0 0 3.5 5.834V2.5h-2v7h7v-2H4.787a8.545 8.545 0 0 1 3.187-2.988A8.458 8.458 0 0 1 12 3.5a8.5 8.5 0 1 1-8.454 9.396l-.104-.995l-1.989.209l.104.994C2.11 18.384 6.573 22.5 12 22.5c5.799 0 10.5-4.701 10.5-10.5ZM11 6v6.414l3.5 3.5l1.414-1.414L13 11.586V6h-2Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gray-300 overflow-hidden shadow-md border-4 border-yellow-500">
              {avatar_url ? (
                <img
                  src={avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-500">No Avatar</p>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {full_name || "Unknown User"}
            </h1>
            <p className="text-md sm:text-lg lg:text-xl text-gray-600 dark:text-white">
              {username || "No Username"}
            </p>
            <p className="text-gray-500 text-sm sm:text-base dark:text-white">{email || "No Email"}</p>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
