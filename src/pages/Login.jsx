import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "demo1-eight-xi.vercel.app/api/auth/login",
        form,
        { withCredentials: true }
      );

      setUser(res.data.user);
      setMessage("success|" + res.data.message);

      setTimeout(() => {
        navigate("/Dashboard");
      }, 800);
    } catch (err) {
      setMessage(
        "error|" + (err.response?.data?.message || "Login failed")
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 relative bg-gradient-to-br from-green-900 via-black to-green-800 text-white">

      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_70%)]"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-400">
            Login
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Welcome back to Smart Agriculture
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 rounded-xl bg-white/80 border focus:ring-2 focus:ring-green-500 outline-none text-black"
            />
            <span className="absolute left-3 top-3 text-gray-500">📧</span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 rounded-xl bg-white/80 border focus:ring-2 focus:ring-green-500 outline-none text-black"
            />
            <span className="absolute left-3 top-3 text-gray-500">🔒</span>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Login
          </motion.button>
        </form>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center text-sm font-medium px-4 py-2 rounded-lg ${
              message.startsWith("success")
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {message.split("|")[1]}
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-sm mt-5 text-gray-300">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-300 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;