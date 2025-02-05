import React, { useEffect, useRef } from "react";
import { useAuth } from "../utils/store/useAuth";
import Header from "../components/tailus/Header";
import { useNavigate } from "react-router-dom";

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
  const fetchedRef = useRef(false); // Prevent multiple fetches

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
      <Header />
      <div className="min-h-screen bg-gradient-to-br bg-zinc-300 flex flex-col items-center py-12">
        <div className="bg-white shadow-lg rounded-2xl w-11/12 sm:w-3/4 lg:w-1/2 p-8 text-center relative">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden shadow-md mb-4 border-4 border-yellow-500">
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
            <h1 className="text-3xl font-bold text-gray-900">
              {full_name || "Unknown User"}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {username || "No Username"}
            </p>
            <p className="text-gray-500">{email || "No Email"}</p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
              onClick={handleEdit}
            >
              Edit 
            </button>
            <button
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
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
