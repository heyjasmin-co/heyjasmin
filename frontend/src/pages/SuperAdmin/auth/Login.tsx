import { SuperAdminLoginData } from "@/lib/superAdminService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSuperAdminLogin } from "../../../hooks/useSuperAdmin";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast } from "../../../utils/react-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SuperAdminLoginData>({
    email: "",
    password: "",
  });

  const { mutate: login, isPending: loading } = useSuperAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: (data: any) => {
        if (data.success) {
          localStorage.setItem("superAdminToken", data.token);
          navigate("/super-admin/dashboard/businesses");
        }
      },
      onError: (error: any) => {
        const msg = error.response?.data?.error || "Login failed";
        errorToast(msg);
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left branding section */}
      <div
        className="relative hidden flex-1 flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 text-white lg:flex"
        style={{ backgroundColor: colorTheme.primary(1) }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="relative z-10 w-full max-w-lg space-y-10 px-4 text-center">
          {/* Branding */}
          <div>
            <h1 className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl">
              {appName}
            </h1>
            <p className="mt-4 text-lg font-medium opacity-90 md:text-xl">
              Super Admin Portal 🔐
            </p>
          </div>

          {/* Admin Features */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-bold text-white">Admin Control</h2>
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold">
                  1. Manage All Businesses
                </p>
                <p className="text-base opacity-90">
                  View and manage all registered businesses in one place.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">2. User Management</p>
                <p className="text-base opacity-90">
                  Control user accounts and business ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right login section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: colorTheme.primary(1) }}
            >
              Super Admin Login
            </h2>
            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-base font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-base font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-base transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                  >
                    <i
                      className={`fa-solid ${!showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                    ></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg px-6 py-3.5 text-base font-bold text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: colorTheme.primary(1) }}
              >
                <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Authenticating...
                  </span>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center text-base">
              <div>
                <Link
                  to="/super-admin/auth/forgot-password"
                  className="font-medium hover:underline"
                  style={{ color: colorTheme.primary(1) }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/super-admin/auth/signup"
                  className="font-medium hover:underline"
                  style={{ color: colorTheme.primary(1) }}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
