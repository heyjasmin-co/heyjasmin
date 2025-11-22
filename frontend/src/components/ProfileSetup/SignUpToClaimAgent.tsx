import { SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import completeIcon from "../../assets/image/completeIcon.png";
import { appName } from "../../theme/appName";
import LeftInfoPanel from "./LeftInfoPanel";

export default function SignUpToClaimAgent({
  currentStep,
  totalSteps,
  businessId,
}: {
  currentStep: number;
  totalSteps: number;
  businessId: string;
}) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hide Clerk SignUp footer */
      .cl-internal-vorlia,
      .cl-footer {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:flex-row">
      <LeftInfoPanel
        currentStep={currentStep}
        totalSteps={totalSteps}
        heading={
          <>
            Claim your{" "}
            <span className="font-semibold text-purple-500">
              {appName} Agent
            </span>
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-phone",
            text: "Grow your business while your agent answers 24/7.",
          },
          {
            icon: "fa-solid fa-gift",
            text: (
              <>
                Free for the first <span className="font-bold">50 minutes</span>
                , no credit card required.
              </>
            ),
          },
          {
            icon: "fa-solid fa-headset",
            text: "Our support team is here and ready to help you.",
          },
        ]}
        trialText={
          <div className="flex gap-2">
            <img
              src={completeIcon}
              alt="Website Icon"
              className="h-5 w-5 shrink-0"
            />{" "}
            <span>
              Start risk-free:{" "}
              <span className="font-semibold">7-day trial</span> with all
              features
            </span>
          </div>
        }
      />

      {/* RIGHT SIDE (Sign Up Card) */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <SignUp
          afterSignInUrl="/admin/dashboard"
          unsafeMetadata={{ businessId }}
          appearance={{
            elements: {
              socialButtonsBlockButton:
                "w-full py-2.5 text-base border rounded-lg shadow-sm hover:bg-gray-50 mb-3",
              socialButtonsBlockButtonText: "text-gray-700 font-medium",

              dividerLine: "hidden",
              dividerText: "hidden",

              formFieldInput:
                "w-full text-base px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500",
              formFieldLabel: "text-sm font-medium text-gray-700 mb-1",

              formButtonPrimary:
                "w-full text-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md",

              footer: "hidden",
            },
            variables: {
              colorPrimary: "#8b5cf6",
            },
          }}
        />
      </div>
    </div>
  );
}
