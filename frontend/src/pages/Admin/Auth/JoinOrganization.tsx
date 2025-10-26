/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApiClient } from "../../../lib/axios";
import { appName } from "../../../theme/appName";
import { colorTheme } from "../../../theme/colorTheme";

export default function JoinOrganization() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get URL parameters
  const userId = searchParams.get("userId");
  const businessId = searchParams.get("businessId");
  const clerkUserId = searchParams.get("clerkUserId");
  const clerkOrganizationId = searchParams.get("clerkOrganizationId");
  const role = searchParams.get("role");
  const businessName = searchParams.get("businessName");
  const email = searchParams.get("email");

  const handleJoinOrganization = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Call your API to join the organization
      await apiClient.post(`/business-user-invitations/accept`, {
        userId,
        businessId,
        clerkOrganizationId,
        role,
        clerkUserId,
        email,
      });

      // Redirect to dashboard on success
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding section */}
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-12 text-white lg:flex"
        style={{ backgroundColor: colorTheme.primary(1) }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="relative z-10 text-center">
          <h1 className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
            {appName}
          </h1>
          <p className="mt-4 text-lg font-medium opacity-90">
            Join your team and start collaborating today.
          </p>
        </div>
      </div>

      {/* Right join organization section */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-6 py-12 lg:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                style={{ backgroundColor: colorTheme.primary(0.1) }}
              >
                🎉
              </div>
            </div>
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: colorTheme.primary(1) }}
            >
              You're Invited!
            </h2>
            <p className="mt-3 text-base text-gray-500 md:text-lg">
              You've been invited to join{" "}
              <span className="font-bold">{businessName}</span> on {appName}
            </p>
          </div>

          {/* Invitation Card */}
          <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Invitation Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Role:</span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium capitalize"
                    style={{
                      backgroundColor: colorTheme.primary(0.1),
                      color: colorTheme.primary(1),
                    }}
                  >
                    {role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Your Email:</span>
                  <span>{email}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleJoinOrganization}
                disabled={isLoading}
                className="w-full rounded-lg px-4 py-3 text-lg font-semibold text-white shadow transition hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: colorTheme.primary(1) }}
              >
                {isLoading ? "Joining..." : "Accept Invitation"}
              </button>

              <button
                onClick={handleDecline}
                disabled={isLoading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Decline
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-base text-gray-500">
            Need help?{" "}
            <a
              href="/admin/support"
              className="font-medium hover:underline"
              style={{ color: colorTheme.primary(1) }}
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
