/* eslint-disable @typescript-eslint/no-explicit-any */
import { superAdminService } from "@/lib/superAdminService";
import { appName } from "@/theme/appName";
import { colorTheme } from "@/theme/colorTheme";
import { errorToast, successToast } from "@/utils/react-toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmailChange = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const performVerification = async () => {
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      if (!token || !id) {
        setError("Invalid verification link. Missing token or ID.");
        setVerifying(false);
        return;
      }

      try {
        const { data } = await superAdminService.verifyEmailChange({
          token,
          id,
        });
        if (data.success) {
          successToast(
            "Email updated successfully! Please login with your new email.",
          );
          // Redirect to login or dashboard
          navigate("/super-admin/auth/login", { replace: true });
        }
      } catch (err: any) {
        const msg =
          err.response?.data?.error ||
          "Verification failed. The link may be expired.";
        setError(msg);
        errorToast(msg);
      } finally {
        setVerifying(false);
      }
    };

    performVerification();
  }, [token, id, navigate]);

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
          <div>
            <h1 className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl">
              {appName}
            </h1>
            <p className="mt-4 text-lg font-medium opacity-90 md:text-xl">
              Secure Email Verification 📧
            </p>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            {verifying ? (
              <div className="space-y-4">
                <i className="fa-solid fa-spinner fa-spin text-4xl text-purple-600"></i>
                <h2 className="text-2xl font-bold text-gray-800">
                  Verifying Email Change...
                </h2>
                <p className="text-gray-500">
                  Please wait while we process your request.
                </p>
              </div>
            ) : error ? (
              <div className="space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <i className="fa-solid fa-xmark text-3xl text-red-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Verification Failed
                </h2>
                <p className="text-gray-600">{error}</p>
                <button
                  onClick={() => navigate("/super-admin/dashboard/settings")}
                  className="w-full rounded-lg bg-gray-800 px-6 py-3 font-bold text-white transition-all hover:bg-gray-900"
                >
                  Back to Settings
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <i className="fa-solid fa-check text-3xl text-green-600"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Email Verified!
                </h2>
                <p className="text-gray-600">
                  Your email has been updated successfully.
                </p>
                <button
                  onClick={() => navigate("/super-admin/dashboard")}
                  className="w-full rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-all hover:bg-purple-700"
                  style={{ backgroundColor: colorTheme.primary(1) }}
                >
                  Go to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailChange;
