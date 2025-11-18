import { colorTheme } from "../../../theme/colorTheme";

function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-10">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colorTheme.primary(0.08)} 0%, ${colorTheme.primary(0.15)} 50%, ${colorTheme.primary(0.08)} 100%)`,
        }}
      />

      {/* Floating orbs */}
      <div
        className="pointer-events-none absolute top-1/4 -left-20 h-64 w-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colorTheme.primary(0.2)} 0%, transparent 70%)`,
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colorTheme.primary(0.25)} 0%, transparent 70%)`,
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-600"></span>
          </span>
          <span className="text-sm font-medium text-gray-700">
            Always Available
          </span>
        </div>

        <h2 className="mb-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-5xl font-black text-transparent sm:text-6xl lg:text-7xl">
          Jasmin always answers.
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-700">
          Every missed call is a lost opportunity. Jasmin helps your business
          stay connected —{" "}
          <span className="font-semibold text-purple-700">24/7</span>, smartly
          and professionally.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/admin/setup"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <span className="relative z-10 text-white">Start Free Trial</span>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>

          <a
            href="mailto:info@heyjasmin.co"
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/50 px-8 py-4 text-lg font-semibold text-purple-700 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:bg-white hover:shadow-lg"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Us
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
