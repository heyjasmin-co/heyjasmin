// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section */}
      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-10 text-white lg:flex">
        <div className="max-w-md text-center">
          <h1 className="text-8xl font-extrabold drop-shadow-lg">404</h1>
          <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
          <p className="mt-2 text-gray-200">
            Sorry, the page you are looking for doesn’t exist or was moved.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            This page doesn’t exist
          </h2>
          <p className="mt-2 text-gray-600">Let’s get you back on track.</p>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              to="/admin/dashboard"
              className="w-full rounded-lg bg-purple-600 px-6 py-3 text-white shadow-md transition hover:bg-purple-700 active:scale-95"
              style={{
                color: "white",
              }}
            >
              Go to Dashboard
            </Link>
            <Link
              to="/admin/sign-in"
              className="w-full rounded-lg border border-gray-300 px-6 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
