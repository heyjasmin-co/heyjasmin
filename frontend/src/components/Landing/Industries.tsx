import websiteIcon from "../../assets/image/websiteIcon.png";
import { colorTheme } from "../../theme/colorTheme";

import clinicImage from "../../assets/image/industries/clinicImage.jpeg";
import constructionImage from "../../assets/image/industries/constructionImage.jpeg";
import legalPracticesImage from "../../assets/image/industries/legalPracticesImage.jpeg";
import realestateImage from "../../assets/image/industries/realestateImage.jpeg";
import repairImage from "../../assets/image/industries/repairImage.jpeg";
import spaImage from "../../assets/image/industries/spaImage.jpeg";

import waveImage from "../../assets/image/waveImage.png";
function Industries() {
  const industries = [
    {
      name: "Healthcare Clinics",
      image: clinicImage,
      icon: "fa-solid fa-stethoscope",
    },
    {
      name: "Legal Practices",
      image: legalPracticesImage,
      icon: "fa-solid fa-scale-balanced",
    },
    {
      name: "Constructions",
      image: constructionImage,
      icon: "fa-solid fa-hard-hat",
    },
    {
      name: "Salons & Spas",
      image: spaImage,
      icon: "fa-solid fa-scissors",
    },
    {
      name: "Automotive Repair",
      image: repairImage,
      icon: "fa-solid fa-wrench",
    },
    {
      name: "Real Estate",
      image: realestateImage,
      icon: "fa-solid fa-building",
    },
  ];

  return (
    <section
      id="industries"
      className="relative flex flex-col items-center justify-center gap-10 px-6 py-12 sm:px-8 lg:py-20 xl:flex-row"
    >
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
        <img
          src={waveImage}
          alt="Wavelength Background"
          className="object-contain"
          style={{
            width: "clamp(250px, 70%, 650px)",
            height: "clamp(250px, 70%, 650px)",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
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
