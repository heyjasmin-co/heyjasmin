import { motion } from "framer-motion";
import { colorTheme } from "../../theme/colorTheme";

function About() {
  const cards = [
    {
      icon: <i className="fa-solid fa-phone text-xl sm:text-2xl"></i>,
      stat: "100%",
      title: "Calls Answered",
      text: "No more voicemails or missed opportunities.",
    },
    {
      icon: <i className="fa-solid fa-calendar-check text-xl sm:text-2xl"></i>,
      stat: "3x",
      title: "More Bookings",
      text: "Turn every ring into a result.",
    },
    {
      icon: <i className="fa-solid fa-star text-xl sm:text-2xl"></i>,
      stat: "5 Stars",
      title: "Customer Satisfaction",
      text: "Delight your callers every time.",
    },
    {
      icon: <i className="fa-solid fa-link text-xl sm:text-2xl"></i>,
      stat: "",
      title: "Seamless Integrations",
      text: "Connects effortlessly with your tools and workflows.",
    },
  ];

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
            className="mb-3 text-xl font-semibold tracking-wider text-black uppercase sm:text-2xl"
          >
            Meet Jasmin
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-3xl leading-tight font-bold text-black sm:text-5xl lg:text-6xl"
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
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl p-6 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "black",
                border: `1px solid ${colorTheme.secondaryColor(0.2)}`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  colorTheme.secondaryColor(1);
                e.currentTarget.style.color = "white";

                const iconWrapper = e.currentTarget.querySelector(
                  ".icon-wrapper"
                ) as HTMLElement;
                const icon = e.currentTarget.querySelector(
                  ".icon"
                ) as HTMLElement;
                if (iconWrapper && icon) {
                  iconWrapper.style.backgroundColor = "white";
                  icon.style.color = "black";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.color = "black";

                const iconWrapper = e.currentTarget.querySelector(
                  ".icon-wrapper"
                ) as HTMLElement;
                const icon = e.currentTarget.querySelector(
                  ".icon"
                ) as HTMLElement;
                if (iconWrapper && icon) {
                  iconWrapper.style.backgroundColor =
                    colorTheme.secondaryColor(1);
                  icon.style.color = "white";
                }
              }}
            >
              <div
                className="icon-wrapper mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14"
                style={{
                  backgroundColor: colorTheme.secondaryColor(1),
                }}
              >
                <div
                  className="icon transition-all duration-300"
                  style={{ color: "white" }}
                >
                  {card.icon}
                </div>
              </div>

              {card.stat && (
                <div className="mb-1 text-4xl font-extrabold transition-all duration-300 sm:text-5xl">
                  {card.stat}
                </div>
              )}

              <div className="mb-2 text-lg font-semibold transition-all duration-300 sm:text-xl">
                {card.title}
              </div>
              <p className="text-sm transition-all duration-300 sm:text-base">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
