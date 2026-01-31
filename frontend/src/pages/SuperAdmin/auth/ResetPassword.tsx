/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSuperAdminClient } from "@/lib/superAdminClient";
import { SuperAdminForgotPasswordData } from "@/lib/superAdminService";
import { appName } from "@/theme/appName";
import { colorTheme } from "@/theme/colorTheme";
import { errorToast, successToast } from "@/utils/react-toast";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const apiClient = useSuperAdminClient();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetData, setResetData] = useState({
    token: token || "",
    newPassword: "",
    confirmPassword: "",
  });
  const [forgotData, setForgotData] = useState<SuperAdminForgotPasswordData>({
    email: "",
  });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token || !id) {
        errorToast("Invalid token or ID");
        return;
      }

      if (resetData.newPassword !== resetData.confirmPassword) {
        errorToast("Passwords do not match");
        return;
      }

      if (resetData.newPassword.length < 6) {
        errorToast("Password must be at least 6 characters");
        return;
      }

      const { data } = await apiClient.post("/super-admin/reset-password", {
        token: resetData.token,
        newPassword: resetData.newPassword,
        id,
      });
      if (data.success) {
        successToast("Password reset successfully!");
        navigate("/super-admin/auth/login");
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || "Failed to reset password";
      errorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post(
        "/super-admin/forgot-password",
        forgotData,
      );
      if (data.success) {
        successToast("Reset link sent to your email!");
        setForgotData({ email: "" });
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || "Failed to send reset link";
      errorToast(msg);
    } finally {
      setLoading(false);
    }
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
              Secure Account Recovery 🔒
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-bold text-white">Security First</h2>
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold">1. Secure Reset Link</p>
                <p className="text-base opacity-90">
                  We'll send a secure, time-limited reset link to your email.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">2. Email Verification</p>
                <p className="text-base opacity-90">
                  Only verified admin emails can request password resets.
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">3. Token Expiration</p>
                <p className="text-base opacity-90">
                  Reset tokens expire after a short period for security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          {token ? (
            <>
              {/* Reset Password Form */}
              <div className="mb-8 text-center">
                <h2
                  className="text-3xl font-bold tracking-tight md:text-4xl"
                  style={{ color: colorTheme.primary(1) }}
                >
                  Reset Password
                </h2>
                <p className="mt-3 text-base text-gray-500 md:text-lg">
                  Enter your new password
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-base font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={resetData.newPassword}
                        onChange={(e) =>
                          setResetData({
                            ...resetData,
                            newPassword: e.target.value,
                          })
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

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-base font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={resetData.confirmPassword}
                        onChange={(e) =>
                          setResetData({
                            ...resetData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-base transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                      >
                        <i
                          className={`fa-solid ${!showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
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
                        Resetting...
                      </span>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-base text-gray-500">
                  Remember your password?{" "}
                  <Link
                    to="/super-admin/auth/login"
                    className="font-medium hover:underline"
                    style={{ color: colorTheme.primary(1) }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Forgot Password Form */}
              <div className="mb-8 text-center">
                <h2
                  className="text-3xl font-bold tracking-tight md:text-4xl"
                  style={{ color: colorTheme.primary(1) }}
                >
                  Forgot Password?
                </h2>
                <p className="mt-3 text-base text-gray-500 md:text-lg">
                  We'll send you a reset link
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <form onSubmit={handleForgotPassword} className="space-y-6">
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
                      value={forgotData.email}
                      onChange={(e) =>
                        setForgotData({ ...forgotData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-50 focus:outline-none"
                      placeholder="name@company.com"
                    />
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
                        Sending...
                      </span>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center text-base text-gray-500">
                  Remember your password?{" "}
                  <Link
                    to="/super-admin/auth/login"
                    className="font-medium hover:underline"
                    style={{ color: colorTheme.primary(1) }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
