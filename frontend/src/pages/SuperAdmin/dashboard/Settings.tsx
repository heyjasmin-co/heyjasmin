/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SuperAdminChangeEmailData,
  SuperAdminChangePasswordData,
} from "@/lib/superAdminService";
import { errorToast, successToast } from "@/utils/react-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../../components/TitleCard";
import { useSuperAdminClient } from "../../../lib/superAdminClient";
import { colorTheme } from "../../../theme/colorTheme";

const Settings = () => {
  const navigate = useNavigate();
  const apiClient = useSuperAdminClient();
  const [loading, setLoading] = useState({ password: false, email: false });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Change Password State
  const [pwData, setPwData] = useState<SuperAdminChangePasswordData>({
    currentPassword: "",
    newPassword: "",
  });

  // Change Email State
  const [emailData, setEmailData] = useState<SuperAdminChangeEmailData>({
    newEmail: "",
    password: "",
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, password: true });
    try {
      const { data } = await apiClient.post(
        "/super-admin/change-password",
        pwData,
      );
      if (data.success) {
        successToast("Password updated successfully");
        setPwData({ currentPassword: "", newPassword: "" });
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to update password";
      errorToast(msg);
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading({ ...loading, email: true });
    try {
      const { data } = await apiClient.post(
        "/super-admin/change-email",
        emailData,
      );
      if (data.success) {
        successToast(
          "Verification email sent! Please check your current email to confirm the change. You have been logged out for security.",
        );
        setEmailData({ newEmail: "", password: "" });
        localStorage.removeItem("superAdminToken");
        setTimeout(() => {
          navigate("/super-admin/auth/login");
        }, 3000);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to update email";
      errorToast(msg);
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex flex-col gap-5">
        <TitleCard
          title="Super Admin Settings"
          subtitle="Manage your super admin account preferences and security settings."
          hasButton={false}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Change Password Card */}
          <div
            className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="h-full w-full divide-y divide-gray-200">
              {/* Header */}
              <div className="flex items-center space-x-3 px-4 py-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
                >
                  <i className="fa-solid fa-lock text-white"></i>
                </div>
                <h5 className="text-lg font-bold text-gray-900">
                  Change Password
                </h5>
              </div>

              {/* Form */}
              <div className="px-4 py-4">
                <form
                  onSubmit={handleChangePassword}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        required
                        value={pwData.currentPassword}
                        onChange={(e) =>
                          setPwData({
                            ...pwData,
                            currentPassword: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            current: !showPasswords.current,
                          })
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                      >
                        <i
                          className={`fa-solid ${!showPasswords.current ? "fa-eye-slash" : "fa-eye"} text-sm`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        required
                        value={pwData.newPassword}
                        onChange={(e) =>
                          setPwData({ ...pwData, newPassword: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                      >
                        <i
                          className={`fa-solid ${!showPasswords.new ? "fa-eye-slash" : "fa-eye"} text-sm`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading.password}
                    className={`mt-2 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition-all ${
                      loading.password
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 active:scale-95"
                    }`}
                  >
                    {loading.password ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check"></i>
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Change Email Card */}
          <div
            className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="h-full w-full divide-y divide-gray-200">
              {/* Header */}
              <div className="flex items-center space-x-3 px-4 py-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
                >
                  <i className="fa-solid fa-envelope text-white"></i>
                </div>
                <h5 className="text-lg font-bold text-gray-900">
                  Change Email
                </h5>
              </div>

              {/* Form */}
              <div className="px-4 py-4">
                <form
                  onSubmit={handleChangeEmail}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="newEmail"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      New Email
                    </label>
                    <input
                      id="newEmail"
                      type="email"
                      required
                      value={emailData.newEmail}
                      onChange={(e) =>
                        setEmailData({ ...emailData, newEmail: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                      placeholder="Enter new email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        required
                        value={emailData.password}
                        onChange={(e) =>
                          setEmailData({
                            ...emailData,
                            password: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
                      >
                        <i
                          className={`fa-solid ${!showPasswords.confirm ? "fa-eye-slash" : "fa-eye"} text-sm`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading.email}
                    className={`mt-2 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold shadow-md transition-all ${
                      loading.email
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 active:scale-95"
                    }`}
                  >
                    {loading.email ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check"></i>
                        <span>Update Email</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
