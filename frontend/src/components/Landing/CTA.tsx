import { colorTheme } from "../../theme/colorTheme";

function CTA() {
  return (
    <section
      className="px-4 py-16 text-center sm:px-6 lg:px-8"
      style={{
        backgroundColor: colorTheme.primary(0.3),
      }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold text-black sm:text-4xl">
          Jasmin always answers.
        </h2>
        <p className="mb-8 text-lg text-black">
          Start risk-free: 7-day trial with all features
        </p>
        <a
          href="/admin"
          style={{
            backgroundColor: colorTheme.secondaryColor(1),
            color: "white",
          }}
          className="rounded-full bg-white px-8 py-4 text-lg font-semibold shadow-xl transition-all hover:shadow-2xl active:scale-95"
        >
          Get Started Free
        </a>
      </div>
    </section>
  );
}

export default CTA;
