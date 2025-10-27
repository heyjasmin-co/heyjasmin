import { motion } from "framer-motion";
import user1 from "../../assets/image/statistics/user_1.png";
import user5 from "../../assets/image/statistics/user_5.png";
import user3 from "../../assets/image/statistics/user_3.png";
import websiteIcon from "../../assets/image/websiteIcon.png";
import { colorTheme } from "../../theme/colorTheme";

export default function Statistics() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28"
  
    >
      {/* Floating Shapes Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-20 left-10 h-32 w-32 rounded-full bg-purple-200/30 blur-2xl"></div>
        <div className="animate-float-delayed absolute top-40 right-20 h-40 w-40 rounded-full bg-blue-200/30 blur-2xl"></div>
        <div className="animate-float absolute bottom-20 left-1/4 h-36 w-36 rounded-full bg-pink-200/30 blur-2xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center sm:mb-20 md:mb-24"
        >
          <h2 className="mb-6 text-4xl leading-tight font-black text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            No missed calls.
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#5A3FFF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                Just happier customers.
              </span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-gray-600 sm:max-w-3xl sm:text-xl md:text-2xl">
            Our AI-powered assistant turns every conversation into conversion
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative sm:row-span-2"
          >
            <div className="relative h-[450px] overflow-hidden rounded-[32px] border-2 border-gray-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl sm:h-full">
              <img
                src={user1}
                alt="Customer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute right-6 bottom-6 left-6">
                <div className="rounded-3xl border border-white/50 bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-xl">
                  <div className="mb-2 flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 animate-pulse rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-bold text-gray-900">
                        Sarah M.
                      </p>
                      <p className="text-base font-semibold text-gray-800">
                        "Hi, I'd like to make an appointment."
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Incoming • 2 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <div
              className="relative h-full min-h-[280px] overflow-hidden rounded-[32px] p-8 shadow-lg transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.8),
              }}
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <img src={websiteIcon} alt="orb" className="h-5 w-5" />
                  <span className="text-sm font-bold text-white">
                    Calls Received
                  </span>
                </div>

                <div className="mb-2">
                  <div className="mb-2 text-7xl font-black text-white">312</div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-300 px-4 py-1.5">
                    <svg
                      className="h-4 w-4 text-purple-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      />
                    </svg>
                    <span className="text-sm font-bold text-purple-900">
                      +45%
                    </span>
                  </div>
                </div>

                <p className="font-medium text-white/90">
                  <span className="font-bold text-purple-200">
                    +128 more calls
                  </span>{" "}
                  than last month
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative"
          >
            <div className="group relative h-[280px] overflow-hidden rounded-[32px] border-2 border-gray-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
              {/* Background image */}
              <img
                src={user3}
                alt="Happy customer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

              {/* Top-right floating orb icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute top-3 right-3 flex items-center justify-center rounded-full"
              >
                <div
                  className="absolute rounded-full blur-xl"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    background: `radial-gradient(circle, ${colorTheme.secondaryColor(1)} 0%, ${colorTheme.secondaryColor(0.8)} 60%)`,
                    boxShadow: `0 0 30px 10px ${colorTheme.secondaryColor(0.4)}`,
                  }}
                />
                <img
                  src={websiteIcon}
                  alt="orb"
                  className="relative z-10 h-16 w-16 object-contain drop-shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative"
          >
            <div
              className="relative h-full min-h-[280px] overflow-hidden rounded-[32px] p-8 shadow-lg transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: colorTheme.secondaryColor(0.8),
              }}
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="absolute top-4 right-4">
                  <div className="rounded-2xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                    ✓ Booked!
                  </div>
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2 backdrop-blur-sm">
                  <img src={websiteIcon} alt="orb" className="h-5 w-5" />
                  <span className="text-sm font-bold text-white">
                    Converted
                  </span>
                </div>

                <div className="mb-2">
                  <div className="mb-2 text-7xl font-black text-white">187</div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-300 px-4 py-1.5">
                    <svg
                      className="h-4 w-4 text-purple-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      />
                    </svg>
                    <span className="text-sm font-bold text-purple-900">
                      +63%
                    </span>
                  </div>
                </div>

                <p className="font-medium text-white/90">
                  <span className="font-bold text-purple-200">+42 more</span>{" "}
                  than last month
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative"
          >
            <div className="relative h-[280px] overflow-hidden rounded-[32px] border-2 border-gray-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl">
              <img
                src={user5}
                alt="Support"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute right-6 bottom-6 left-6">
                <div className="rounded-2xl border border-white/50 bg-white/95 px-5 py-3 shadow-xl backdrop-blur-xl">
                  <p className="mb-1 text-sm font-bold text-gray-900">
                    Issue Resolved! ✓
                  </p>
                  <p className="text-xs font-semibold text-purple-600">
                    +25% faster response time
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
