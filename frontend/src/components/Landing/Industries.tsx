import websiteIcon from "../../assets/image/websiteIcon.png";
import { colorTheme } from "../../theme/colorTheme";

function Industries() {
  const industries = [
    {
      name: "Healthcare Clinics",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=300",
      icon: "fa-solid fa-stethoscope",
    },
    {
      name: "Legal Practices",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300",
      icon: "fa-solid fa-scale-balanced",
    },
    {
      name: "Constructions",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300",
      icon: "fa-solid fa-hard-hat",
    },
    {
      name: "Salons & Spas",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300",
      icon: "fa-solid fa-scissors",
    },
    {
      name: "Automotive Repair",
      image:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300",
      icon: "fa-solid fa-wrench",
    },
    {
      name: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300",
      icon: "fa-solid fa-building",
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center gap-10 px-6 py-12 sm:px-8 lg:py-20 xl:flex-row">
      {/* LEFT TEXT */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left xl:w-[45%]">
        <h2 className="mb-6 text-5xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          Designed for your <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${colorTheme.secondaryColor(1)}, #8b5cf6)`,
            }}
          >
            industry’s unique demands
          </span>
        </h2>
        <p className="mb-10 max-w-lg text-xl text-gray-700 sm:text-lg">
          Jasmin tailors intelligent solutions for every business — whether
          you’re managing a clinic, law firm, construction site, or salon.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative hidden h-[300px] w-[300px] flex-col items-center justify-center sm:flex sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px] xl:h-[680px] xl:w-[680px]">
        {/* Center Circle */}
        <div
          className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center rounded-full shadow-2xl ring-2 ring-purple-100"
          style={{
            transform: "translate(-50%, -50%)",
            width: "clamp(80px, 20%, 160px)",
            height: "clamp(80px, 20%, 160px)",
            backgroundColor: "#403BC1",
            boxShadow: "0 0 50px 15px rgba(139,92,246,0.3)",
          }}
        >
          <img
            src={websiteIcon}
            alt="Website Logo"
            className="h-[80%] w-[80%] object-cover"
          />
        </div>

        {/* Cards */}
        {industries.map((industry, idx) => {
          const total = industries.length;
          const angle = (360 / total) * idx; // Evenly distribute

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-2xl"
              style={{
                top: `calc(50% + 40% * cos(${angle}deg))`,
                left: `calc(50% + 40% * sin(${angle}deg))`,
                transform: "translate(-50%, -50%)",
                width: "clamp(120px, 18vw, 200px)",
                height: "clamp(120px, 18vw, 170px)",
              }}
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="h-[60%] w-full object-cover"
              />
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <i className={`${industry.icon} text-xl text-purple-600`}></i>
                <p className="text-center text-xs font-semibold text-gray-800">
                  {industry.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE GRID */}
      <div className="grid w-full max-w-2xl grid-cols-2 gap-6 sm:hidden">
        {industries.map((industry, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={industry.image}
              alt={industry.name}
              className="h-24 w-full object-cover"
            />
            <div className="flex flex-col items-center justify-center py-3">
              <i
                className={`${industry.icon} mb-1 text-2xl text-purple-600`}
              ></i>
              <p className="text-center text-sm font-semibold text-gray-800">
                {industry.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Industries;
