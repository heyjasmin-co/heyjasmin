import completeIcon from "../../assets/image/completeIcon.png";
import { colorTheme } from "../../theme/colorTheme";

function Breadcrumb({ currentStep }: { currentStep: number }) {
  const steps = ["Quick Set-up", "Talk to Jasmin", "Launch"];

  return (
    <div className="w-full px-2 md:px-0">
      {/* Desktop View */}
      <div className="hidden w-full justify-between gap-4 md:flex">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg p-4 transition-all duration-300"
            style={{
              backgroundColor:
                currentStep === index
                  ? colorTheme.secondaryColor(1)
                  : colorTheme.secondaryColor(0.2),
              color: currentStep === index ? "#ffffff" : "#4B5563",
              boxShadow:
                currentStep === index ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
            }}
          >
            {/* Step Circle */}
            {index < currentStep || currentStep == 2 ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <img
                  src={completeIcon}
                  alt="Complete Icon"
                  className="h-10 w-10"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black shadow-md">
                {index + 1}
              </div>
            )}

            {/* Step Label */}
            <div className="mt-2 text-center text-sm font-medium md:text-base">
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col gap-3 md:hidden">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all duration-300"
            style={{
              backgroundColor:
                currentStep === index
                  ? colorTheme.secondaryColor(1)
                  : colorTheme.secondaryColor(0.2),
              color: currentStep === index ? "#ffffff" : "#4B5563",
              boxShadow:
                currentStep === index ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
            }}
          >
            {/* Step Circle */}
            {index < currentStep || currentStep == 2 ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <img
                  src={completeIcon}
                  alt="Complete Icon"
                  className="h-7 w-7"
                />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-black shadow-md">
                {index + 1}
              </div>
            )}

            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumb;
