import { colorTheme } from "../../theme/colorTheme";

function HowWorks() {
  return (
    <section
      id="how-it-works"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      style={{
        backgroundColor: colorTheme.primary(1),
        color: "white",
      }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">
          How It Works
        </h2>
        <div className="space-y-8">
          {[
            {
              step: "1",
              title: "Train Jasmin on your business",
              desc: "Use your Google Business profile, website address, or simple business information to get started.",
            },
            {
              step: "2",
              title: "Confirm Jasmin has things right",
              desc: "Jasmin will be trained on your specific business information. Make adjustments and add custom questions.",
            },
            {
              step: "3",
              title: "Forward your calls to Jasmin",
              desc: "No need to change your existing business number. Just forward calls to Jasmin when you want her to answer.",
            },
            {
              step: "4",
              title: "Jasmin answers and takes messages",
              desc: "When a call comes in, Jasmin will answer, answer questions, and take messages. You'll be notified by email and/or text.",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-6">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{
                  backgroundColor: colorTheme.secondaryColor(1),
                }}
              >
                {item.step}
              </div>
              <div className="flex-1 text-left">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-white/80">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWorks;
