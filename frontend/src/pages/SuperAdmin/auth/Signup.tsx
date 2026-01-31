import { SuperAdminSignupData } from "@/lib/superAdminService";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSuperAdminSignup } from "../../../hooks/useSuperAdmin";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SuperAdminSignupData>({
    email: "",
    password: "",
  });

  const { mutate: signup, isPending: loading } = useSuperAdminSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData, {
      onSuccess: (data: any) => {
        if (data.success) {
          successToast("Account created successfully!");
          navigate("/super-admin/auth/login");
        }
      },
      onError: (error: any) => {
        const msg = error.response?.data?.error || "Signup failed";
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
              Join as a Super Admin 🚀
            </p>
          </div>

          {/* Admin Benefits */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-bold text-white">
              Super Admin Benefits
            </h2>
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold">1. Full Platform Access</p>
                <p className="text-base opacity-90">
                  Complete control over all businesses and users on the
                  platform.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">2. Advanced Analytics</p>
                <p className="text-base opacity-90">
                  Monitor platform usage, performance, and growth metrics.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">3. System Configuration</p>
                <p className="text-base opacity-90">
                  Configure global settings and manage platform features.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">4. Priority Support</p>
                <p className="text-base opacity-90">
                  Direct access to technical support and platform updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right signup section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: colorTheme.primary(1) }}
            >
              Create Admin Account ✨
            </h2>
            <p className="mt-3 text-base text-gray-500 md:text-lg">
              Sign up to access the admin portal
            </p>
          </div>

          {/* Signup Form */}
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
                    Creating account...
                  </span>
                ) : (
                  "Create Admin Account"
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center text-base text-gray-500">
              Already have an account?{" "}
              <Link
                to="/super-admin/auth/login"
                className="font-medium hover:underline"
                style={{ color: colorTheme.primary(1) }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
