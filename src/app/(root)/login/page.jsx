"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        window.dispatchEvent(new Event("userLogin"));
        window.location.reload();
        router.push("/");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md border border-[#007BFF]/20 bg-white">
        <h2 className="text-2xl font-bold text-center text-[#2f2f2f] mb-6 uppercase tracking-wide">
          Welcome Back!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1E90FF]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-[#1E90FF]/30 rounded-lg shadow-sm 
              focus:outline-none focus:ring-[#007BFF] focus:border-[#007BFF]"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#1E90FF]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-[#1E90FF]/30 rounded-lg shadow-sm 
              focus:outline-none focus:ring-[#007BFF] focus:border-[#007BFF] pr-10"
              placeholder="••••••••"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-[#007BFF]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-[#1E90FF]">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="form-checkbox text-[#007BFF] rounded"
              />
              <span>Remember me</span>
            </label>

            <a href="#" className="text-sm text-red-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#007BFF] text-white font-semibold rounded-lg shadow-md 
            hover:bg-[#0056b3] transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Error */}
        {errorMsg && (
          <p className="mt-4 text-sm text-center text-red-500 font-medium">
            {errorMsg}
          </p>
        )}

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-[#1E90FF]">
          Don't have an account?{" "}
          <Link href="/registration" className="text-red-500 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
