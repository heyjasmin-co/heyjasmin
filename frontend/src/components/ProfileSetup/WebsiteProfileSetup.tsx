import { useForm } from "react-hook-form";
import completeIcon from "../../assets/image/completeIcon.png";
import sparklesIcon from "../../assets/image/sparklesIcon.png";
import { appName } from "../../theme/appName";
import LeftInfoPanel from "./LeftInfoPanel";

export default function WebsiteProfileSetup({
  currentStep,
  totalSteps,
  handleScrapeData,
}: {
  currentStep: number;
  totalSteps: number;
  handleScrapeData: (websiteUrl: string) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { websiteUrl: "" },
  });

  const websiteUrl = watch("websiteUrl");

  const onSubmit = async (data: { websiteUrl: string }) => {
    await handleScrapeData(data.websiteUrl);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:h-full lg:flex-row">
      <LeftInfoPanel
        currentStep={currentStep}
        totalSteps={totalSteps}
        heading={
          <>
            Train {appName} with your{" "}
            <span className="text-purple-200">Business Profile</span>
          </>
        }
        listItems={[
          {
            icon: "fa-solid fa-magnifying-glass",
            text: (
              <>
                Enter your{" "}
                <span className="font-bold">website URL to start</span>.
              </>
            ),
          },
          {
            icon: "fa-solid fa-robot",
            text: "Your AI agent will be trained on your profile.",
          },
          {
            icon: "fa-solid fa-clock",
            text: "Takes less than a minute!",
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
              <span className="font-semibold">5-day trial</span> with all
              features
            </span>
          </div>
        }
      />

      {/* Right section */}
      <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-lg flex-col gap-8 rounded-xl p-6 sm:p-8 lg:p-10"
        >
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Enter your Website Address
          </h2>

          <input
            type="text"
            placeholder="https://"
            {...register("websiteUrl", {
              required: "Website URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)?((([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63})|localhost|(\d{1,3}(?:\.\d{1,3}){3}))(?:\:\d{1,5})?(?:\/[^\s]*)?$/,
                message: "Enter a valid website URL",
              },
            })}
            className="w-full rounded-full border border-gray-300 px-6 py-4 text-lg text-gray-800 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
          />
          {errors.websiteUrl && (
            <p className="text-sm text-red-500">{errors.websiteUrl.message}</p>
          )}

          <button
            type="submit"
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95 ${
              websiteUrl
                ? "bg-purple-600 hover:bg-purple-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Train {appName}
            <img src={sparklesIcon} alt="Sparkles" className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
