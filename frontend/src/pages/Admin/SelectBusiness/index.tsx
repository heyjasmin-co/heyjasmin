/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import completeIcon from "../../../assets/image/completeIcon.png";
import LeftInfoPanel from "../../../components/ProfileSetup/LeftInfoPanel";
import { useUserData } from "../../../context/UserDataContext";
import { useSelectBusiness } from "../../../hooks/api/useAuthMutations";
import { useGetUserBusinesses } from "../../../hooks/api/useUserQueries";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";
import { capitalizeString } from "../../../utils/string-utils";

type FormValues = {
  businessId: string;
};

export default function SelectBusinessPage() {
  const { handleSubmit, watch, setValue } = useForm<FormValues>();

  // const apiClient = useApiClient(); // Replaced by hooks
  const { mutateAsync: selectBusiness, isPending: isSelecting } =
    useSelectBusiness();
  const { data: userBusinesses = [], isLoading: isBusinessesLoading } =
    useGetUserBusinesses();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [userBusinesses, setUserBusinesses] = useState<UserBusinessesType>([]);
  // const [loading, setLoading] = useState({
  //   apiLoading: false,
  //   selectBusinessLoading: false,
  // });

  const navigate = useNavigate();
  const selectedBusiness = watch("businessId");
  const { userData } = useUserData();

  useLayoutEffect(() => {
    if (userData?.businessId) {
      navigate("/admin/dashboard");
      return;
    }
  }, [userData, navigate]);

  useLayoutEffect(() => {
    if (userBusinesses.length === 1) {
      const onlyBusinessId = userBusinesses[0];
      setValue("businessId", onlyBusinessId.businessId);
    }
    if (!isBusinessesLoading && userBusinesses.length === 0) {
      navigate("/admin/setup");
    }
  }, [userBusinesses, isBusinessesLoading, setValue, navigate]);

  const handleBusinessSelect = async (businessId: string) => {
    if (!businessId) return;
    // setLoading((pv) => ({ ...pv, selectBusinessLoading: true }));
    const [findRole] = userBusinesses.filter(
      (business) => business.businessId === businessId,
    );
    try {
      await selectBusiness({ businessId, role: findRole.role });

      successToast("Business selected successfully.");

      await new Promise((res) => setTimeout(res, 2000));
      window.location.href = "/admin/dashboard";
    } catch (error: any) {
      console.error(error);
      errorToast(error.response?.data?.error || "Failed to select business");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleBusinessSelect(data.businessId);
  };
  if (isBusinessesLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="h-auto min-h-[400px] w-full max-w-[1100px] sm:min-h-[500px] lg:h-[600px]">
        <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-2xl lg:h-full lg:flex-row">
          {/* Left Section */}
          <LeftInfoPanel
            currentStep={1}
            totalSteps={1}
            progressBar={false}
            heading={
              <>
                Choose your <span className="text-purple-200">Business</span> to
                continue
              </>
            }
            listItems={[
              {
                icon: "fa-solid fa-shop",
                text: (
                  <>
                    Pick the <span className="font-bold">business</span> you
                    want to manage.
                  </>
                ),
              },
              {
                icon: "fa-solid fa-briefcase",
                text: "Each business has its own profile and data.",
              },
              {
                icon: "fa-solid fa-arrow-right-long",
                text: "Proceed to the next step to complete setup.",
              },
            ]}
            trialText={
              <div className="flex items-center gap-2">
                <img
                  src={completeIcon}
                  alt="Business Icon"
                  className="h-5 w-5 shrink-0"
                />
                <span>
                  Seamless onboarding —{" "}
                  <span className="font-semibold">takes under 2 minutes</span>
                </span>
              </div>
            }
          />

          {/* Right Section */}
          <div className="flex w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full max-w-lg flex-col gap-8 rounded-xl p-6 sm:p-8 lg:p-10"
            >
              <h2 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">
                Select Your Business
              </h2>

              {/* Custom dropdown */}
              <div className="relative w-full">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-full border border-gray-300 bg-white px-6 py-4 text-lg text-gray-800 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-300 disabled:cursor-not-allowed disabled:bg-gray-100"
                    disabled={isBusinessesLoading}
                  >
                    <span>
                      {selectedBusiness
                        ? userBusinesses.find(
                            (b) => b.businessId === selectedBusiness,
                          )?.businessName
                        : "Choose a business..."}
                    </span>
                    <i className="fa-solid fa-chevron-down text-gray-500"></i>
                  </button>

                  {/* Dropdown list */}
                  {dropdownOpen && (
                    <ul className="absolute right-0 left-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                      {userBusinesses.map((business) => (
                        <li
                          key={business.businessId}
                          onClick={() => {
                            setValue("businessId", business.businessId);
                            setDropdownOpen(false);
                          }}
                          className={`flex cursor-pointer items-center justify-between px-5 py-3 text-gray-800 transition hover:bg-purple-50 ${
                            selectedBusiness === business.businessId
                              ? "bg-purple-100"
                              : ""
                          }`}
                        >
                          <span className="font-medium">
                            {business.businessName}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold text-white`}
                            style={{
                              backgroundColor: colorTheme.secondaryColor(0.9),
                            }}
                          >
                            {capitalizeString(business.role)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedBusiness || isSelecting}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95 ${
                  selectedBusiness && !isSelecting
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {isSelecting ? "Processing..." : "Continue"}
                <i className="fa-solid fa-arrow-right text-lg text-white"></i>
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/setup")}
                className="flex items-center justify-center gap-2 text-lg font-medium text-purple-600 transition-all duration-200 hover:text-purple-700 active:scale-95"
              >
                Create new business
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
