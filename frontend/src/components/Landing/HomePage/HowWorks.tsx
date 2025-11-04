import { motion } from "framer-motion";
import { colorTheme } from "../../../theme/colorTheme";

function HowWorks() {
  const steps = [
    {
      id: 1,
      title: "Train Jasmin on your business",
      desc: "Give Jasmin a quick intro — just your Google Business Profile, website or business details. She learns who you are and how to represent your brand instantly.",
      step: 1,
    },
    {
      id: 2,
      title: "Customize and confirm",
      desc: "Fine-tune Jasmin's responses, FAQs, and tone. In just a few clicks, she's aligned with your brand voice.",
      step: 2,
    },
    {
      id: 3,
      title: "Start capturing calls and leads",
      desc: "Once you're ready, forward your calls to Jasmin — she'll start instantly.",
      step: 3,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="px-6 py-24"
      style={{ backgroundColor: colorTheme.primary(0.3), color: "white" }}
    >
      <div className="mx-auto max-w-7xl text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="mb-6 text-4xl font-extrabold text-black sm:text-5xl">
            Effortless setup.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(
                  1,
                )}, #9b6bff)`,
              }}
            >
              Intelligent results
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-black md:text-xl">
            Your AI receptionist, ready to answer every call — 24/7. Here's how
            easy it is to get started with Jasmin.
          </p>
        </div>

        {/* Steps Cards */}
        <div className="grid gap-12 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              className="relative flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-2xl transition-transform hover:scale-105"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Icon / Step Number */}
              <div
                className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
                style={{
                  background: colorTheme.secondaryColor(1),
                }}
              >
                {step.step}
              </div>

              <div className="mt-12">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWorks;
