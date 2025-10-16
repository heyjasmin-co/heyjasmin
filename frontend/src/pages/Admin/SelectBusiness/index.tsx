/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import completeIcon from "../../../assets/image/completeIcon.png";
import LeftInfoPanel from "../../../components/ProfileSetup/LeftInfoPanel";
import { useApiClient } from "../../../lib/axios";
import { errorToast, successToast } from "../../../utils/react-toast";

type UserBusiness = {
  _id: string;
  role: "admin" | "editor" | "viewer";
  businessId: string;
  businessName: string;
};

type FormValues = {
  businessId: string;
};

export default function SelectBusinessPage() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();
  const apiClient = useApiClient();
  const [userBusinesses, setUserBusinesses] = useState<UserBusiness[]>([]);
  const [loading, setLoading] = useState({
    apiLoading: false,
    selectBusinessLoading: false,
  });
  const navigate = useNavigate();
  const selectedBusiness = watch("businessId");

  useEffect(() => {
    const fetchUserBusinesses = async () => {
      setLoading((pv) => ({ ...pv, apiLoading: true }));
      try {
        const response = await apiClient("/users/user-businesses");
        const businesses = response.data.data;
        setUserBusinesses(businesses);

        if (businesses.length === 1) {
          const onlyBusinessId = businesses[0].businessId;
          setValue("businessId", onlyBusinessId);
        }
        if (businesses.length === 0) {
          navigate("/admin/setup");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((pv) => ({ ...pv, apiLoading: false }));
      }
    };

    fetchUserBusinesses();
  }, []);

  const handleBusinessSelect = async (businessId: string) => {
    if (!businessId) return;
    setLoading((pv) => ({ ...pv, selectBusinessLoading: true }));
    try {
      await apiClient.post(`/users/select-business`, { businessId });

      successToast("Business selected successfully.");

      await new Promise((res) => setTimeout(res, 2000));
      window.location.href = "/admin/dashboard";
    } catch (error: any) {
      console.error(error);
      errorToast(error.response.data.error);
    } finally {
      setLoading((pv) => ({ ...pv, selectBusinessLoading: false }));
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleBusinessSelect(data.businessId);
  };

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

              <div className="relative">
                <select
                  {...register("businessId", { required: true })}
                  disabled={loading.apiLoading}
                  className="w-full appearance-none rounded-full border border-gray-300 bg-white px-6 py-4 text-lg text-gray-800 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-300 disabled:cursor-not-allowed disabled:bg-gray-100"
                >
                  {loading.apiLoading ? (
                    <option disabled>Loading businesses...</option>
                  ) : (
                    <>
                      <option value="">Choose a business...</option>
                      {userBusinesses.map((business) => (
                        <option
                          key={business.businessId}
                          value={business.businessId}
                        >
                          {business.businessName}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <i className="fa-solid fa-chevron-down absolute top-5 right-5 text-gray-500"></i>
              </div>

              <button
                type="submit"
                disabled={!selectedBusiness || loading.selectBusinessLoading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95 ${
                  selectedBusiness && !loading.selectBusinessLoading
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                {loading.selectBusinessLoading ? "Processing..." : "Continue"}
                <i className="fa-solid fa-arrow-right text-lg text-white"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
