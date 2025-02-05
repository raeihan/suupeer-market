import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/store/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    });
    
    const { login } = useAuth();
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    login(formData.email, formData.password);
    
    if (!formData.email || !formData.password) {
    alert("Email atau Password salah");
    } else {
    alert("Berhasil login");
    navigate("/");
    }
    };
    
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-warning text-white">
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
