import { useState } from "react";
import { colorTheme } from "../theme/colorTheme";

function Breadcrumb() {
  const steps = ["Quick Set-up", "Talk to Rosie", "Launch"];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full overflow-x-auto px-4 py-4">
      {/* Desktop View */}
      <div className="hidden min-w-max items-center justify-center md:flex">
        {steps.map((step, index) => (
          <div
            key={index}
            className=" relative flex h-20 items-center py-2 px-12"
            style={{
              backgroundColor:
                currentStep === index
                  ? colorTheme.secondaryColor(0.4)
                  : colorTheme.secondaryColor(0.1),
              borderRadius:
                index === 0
                  ? "0.75rem 0 0 0.75rem"
                  : index === steps.length - 1
                    ? "0 0.75rem 0.75rem 0"
                    : "0",
              clipPath:
                index === 0 || index === 1
                  ? "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)"
                  : undefined,
              marginLeft: index > 0 ? "-10px" : "0",
            }}
          >
            {/* Step number */}
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  currentStep === index
                    ? colorTheme.secondaryColor(1)
                    : colorTheme.secondaryColor(0.2),
                color: currentStep === index ? "white" : "black",
              }}
            >
              {index + 1}
            </div>

            {/* Step label */}
            <span
              style={{
                color:
                  currentStep === index
                    ? colorTheme.secondaryColor(1)
                    : "black",
              }}
              className="ml-3 font-medium whitespace-nowrap"
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step item */}
            <div
              className="flex items-center rounded-lg p-4"
              style={{
                backgroundColor:
                  currentStep === index
                    ? colorTheme.secondaryColor(0.15)
                    : colorTheme.secondaryColor(0.05),
                marginBottom: index < steps.length - 1 ? "12px" : "0",
              }}
            >
              {/* Step number */}
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    currentStep === index
                      ? colorTheme.secondaryColor(1)
                      : colorTheme.secondaryColor(0.2),
                  color: currentStep === index ? "white" : "black",
                }}
              >
                {index + 1}
              </div>

              {/* Step label */}
              <span className="ml-3 font-medium">{step}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumb;
