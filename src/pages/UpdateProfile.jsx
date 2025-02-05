import React, { useState } from "react";
import { useAuth } from "../utils/store/useAuth";
import Header from "../components/tailus/Header";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { full_name, email, username, avatar_url, user, updateProfile } = useAuth();
  const [name, setName] = useState(full_name);
  const [newEmail, setNewEmail] = useState(email);
  const [newUsername, setNewUsername] = useState(username);
  const [avatar, setAvatar] = useState(avatar_url);
  const [avatarLink, setAvatarLink] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User not found!");
      return;
    }
    const success = await updateProfile(user.id, name, newEmail, newUsername, avatar);
    if (success) {
      alert("Profile Updated Successfully!");
      navigate("/profilepage");
    } else {
      alert("Failed to update profile.");
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleAvatarLinkChange = () => {
    setAvatar(avatarLink);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br bg-zinc-300 flex flex-col items-center py-12 px-4">
        <button
          className="absolute top-4 left-4 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full shadow-md"
          onClick={() => navigate(-1)}
        >
          <h2>{"< -"}</h2>
        </button>
        <div className="bg-white shadow-lg rounded-2xl w-11/12 sm:w-3/4 lg:w-1/2 p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Update Profile</h2>
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden shadow-md mb-4 border-4 border-yellow-500">
              <a href="#" onClick={() => document.getElementById('avatarInput').click()}>
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              </a>
            </div>
            <input
              id="avatarInput"
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <input
              type="text"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Or enter image URL"
              value={avatarLink}
              onChange={(e) => setAvatarLink(e.target.value)}
            />
            <button
              className="my-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
              onClick={handleAvatarLinkChange}
            >
              Use Image Link
            </button>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-300"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-300"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-300"
              placeholder="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
