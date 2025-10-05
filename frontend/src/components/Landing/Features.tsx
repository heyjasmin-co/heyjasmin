import { colorTheme } from "../../theme/colorTheme";

function Features() {
  return (
    <section
      id="features"
      className="px-6 py-20"
      style={{
        backgroundColor: colorTheme.primary(1),
      }}
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-16 text-4xl font-extrabold text-white">
          Why Choose Jasmin
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "📞",
              title: "Never miss another call",
              desc: "Jasmin answers anytime you're unavailable.",
            },
            {
              icon: "✉️",
              title: "No more voicemail hangups",
              desc: "She takes messages and notifies you instantly.",
            },
            {
              icon: "💰",
              title: "10x cheaper",
              desc: "Save money with AI-powered call handling.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center rounded-3xl bg-white p-8 shadow-xl transition hover:scale-105"
            >
              <div
                className="absolute -top-10 flex h-20 w-20 items-center justify-center rounded-full text-3xl text-white shadow-lg"
                style={{
                  backgroundColor: colorTheme.secondaryColor(1),
                  color: "white",
                }}
              >
                {feature.icon}
              </div>
              <div className="mt-12">
                <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
