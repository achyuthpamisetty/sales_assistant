import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones, Mail, Lock, User, Building } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "", company: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password, name, company } = formData;

      // Fake credential validation
      if (
        (isLogin && email === "test@example.com" && password === "test123") ||
        (!isLogin && email && password && name && company)
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay

        // Save session
        localStorage.setItem("isAuthenticated", "true");

        // Navigate to homepage/dashboard
        navigate("/");
      } else {
        alert("Invalid credentials or missing fields");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <Headphones className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-700">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
