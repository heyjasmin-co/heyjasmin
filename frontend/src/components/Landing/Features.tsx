import { motion } from "framer-motion";
import { colorTheme } from "../../theme/colorTheme";
function Features() {
  const mainFeatures = [
    {
      title: "Instant Setup",
      desc: "Get Jasmin up and running in minutes — no tech team, no headaches. Smart, seamless, and stress-free from day one.",
      iconClass: "fas fa-bolt", // Font Awesome icon class
    },
    {
      title: "Human-like Conversations",
      desc: "Jasmin doesn't just answer calls – she connects. With friendly, natural dialogue, she helps customers, answers FAQs, and books appointments 24/7 – just like your best employee.",
      iconClass: "fas fa-comments",
    },
    {
      title: "Scales With You",
      desc: "Whether you're growing fast or just getting started, Jasmin grows with you – handling more calls, capturing every lead, and keeping your business always on.",
      iconClass: "fas fa-chart-line",
    },
  ];

  return (
    <section
      id="features"
      className="px-6 py-24"
      style={{ backgroundColor: colorTheme.primary(0.3) }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-5xl leading-tight font-extrabold text-black sm:text-6xl">
            Why Choose{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(
                  1
                )}, #9b6bff)`,
              }}
            >
              Jasmin
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed font-semibold text-black sm:text-2xl">
            Smarter AI-powered call handling that grows your business
            seamlessly,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(
                  1
                )}, #9b6bff)`,
              }}
            >
              even after hours.
            </span>
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-12 lg:grid-cols-3">
          {mainFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-col items-center rounded-3xl bg-white p-8 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              whileHover={{ y: -5 }}
            >
              <div
                className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-lg"
                style={{
                  background: colorTheme.secondaryColor(0.9),
                  color: "white",
                }}
              >
                <i className={feature.iconClass}></i>
              </div>
              <div className="mt-12 text-center">
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
