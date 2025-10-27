import { motion } from "framer-motion";
import { colorTheme } from "../../theme/colorTheme";

function About() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-8 lg:px-12 xl:px-16"
      style={{
        backgroundColor: colorTheme.primary(0.3),
      }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xl font-semibold uppercase tracking-wider text-black sm:text-2xl"
          >
            Meet Jasmin
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-3xl font-bold text-black sm:text-5xl lg:text-6xl leading-tight"
          >
            <span className="bg-gradient-to-r from-[#5A3FFF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
              The Future of Call Handling
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mb-4 max-w-3xl text-base leading-relaxed text-black/80 sm:text-lg md:text-xl"
          >
            Jasmin transforms how businesses connect with their customers –
            answering every call, capturing every lead, and booking every
            opportunity.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-3xl text-base leading-relaxed text-black/80 sm:text-lg md:text-xl"
          >
            With AI that listens, learns, and responds instantly, Jasmin keeps
            your business running smoothly – 24/7.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              ),
              stat: "100%",
              title: "Calls Answered",
              text: "No more voicemails or missed opportunities.",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              ),
              stat: "3x",
              title: "More Bookings",
              text: "Turn every ring into a result.",
            },
            {
              icon: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ),
              stat: "5 Stars",
              title: "Customer Satisfaction",
              text: "Delight your callers every time.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl bg-white/90 p-6 sm:p-8 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              style={{
                border: `1px solid ${colorTheme.secondaryColor(0.2)}`,
              }}
            >
              <div
                className="mx-auto mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: colorTheme.secondaryColor(1) }}
              >
                {card.icon}
              </div>
              <div className="mb-1 text-4xl sm:text-5xl font-extrabold text-black">
                {card.stat}
              </div>
              <div className="mb-2 text-lg sm:text-xl font-semibold text-black">
                {card.title}
              </div>
              <p className="text-sm sm:text-base text-black/80">{card.text}</p>
            </motion.div>
          ))}

          {/* ✅ Fixed Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              backgroundColor: colorTheme.secondaryColor(0.9),
              border: `1px solid ${colorTheme.secondaryColor(0.2)}`,
            }}
          >
            <div className="mx-auto mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div className="mb-3 text-xl sm:text-2xl font-bold text-white">
              Seamless Integrations
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-white/90">
              Connects effortlessly with your tools and workflows.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
