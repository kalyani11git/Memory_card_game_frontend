import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://memory-card-game-backend-dq2v.onrender.com/api/login`, formData);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        // console.log("Token stored:", response.data.token);
        toast.success("Login successful!");
        navigate("/");
        // Navigate("/home");
      } else {
        // console.log("No token received from the server.");
      }
  
      return response.data; // { token, user }
    } catch (error) {
      // console.log(error);
      throw error.response?.data?.message || "Login failed";
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-blue-500">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account? 
          <Link to="/signup" className="text-blue-400 font-semibold hover:underline"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
