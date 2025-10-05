import { colorTheme } from "../../theme/colorTheme";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          AI answering service for your{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundColor: colorTheme.secondaryColor(0.9),
            }}
          >
            business calls
          </span>
        </h1>
        <p className="mx-auto mb-4 max-w-3xl text-lg text-gray-700 sm:text-xl lg:text-2xl">
          10x better than voicemail. 10x cheaper than an answering service.
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg">
          Grow your business while Jasmin answers your calls, helps set
          appointments, and sends you the messages.
        </p>
        <a
          href="/admin"
          className="mb-4 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          style={{
            backgroundColor: colorTheme.secondaryColor(0.9),
            color: "white",
          }}
        >
          Get Started
        </a>

        <p className="mt-6 text-sm text-gray-500">
          5 days free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
