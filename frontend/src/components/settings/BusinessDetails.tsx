/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import editIcon from "../../assets/image/editIcon.png";
import saveIcon from "../../assets/image/saveIcon.png";
import { useUserData } from "../../context/UserDataContext";
import { useApiClient } from "../../lib/axios";
import { colorTheme } from "../../theme/colorTheme";
import { BusinessDetailsType } from "../../types/BusinessTypes";
import { errorToast, successToast } from "../../utils/react-toast";

type UpdateBusinessInformationResponse = {
  name: string;
  overview: string;
  address: string;
};

type BusinessDetailsProps = {
  businessOverview: string;
  businessName: string;
  businessAddress: string;
  setBusinessDetails: React.Dispatch<
    React.SetStateAction<BusinessDetailsType | null>
  >;
};

function BusinessDetails({
  businessOverview,
  businessName,
  businessAddress,
  setBusinessDetails,
}: BusinessDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(businessName);
  const [overview, setOverview] = useState(businessOverview);
  const [address, setAddress] = useState(businessAddress);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    businessName: string | null;
    overview: string | null;
    address: string | null;
  }>({
    businessName: null,
    overview: null,
    address: null,
  });

  const apiClient = useApiClient();
  const { userData } = useUserData();

  const handleSave = async () => {
    const validationErrors: any = {};
    if (name.trim() === "")
      validationErrors.businessName = "Business name is required.";
    if (overview.trim() === "")
      validationErrors.overview = "Business description is required.";
    if (address.trim() === "")
      validationErrors.address = "Business address is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({
      businessName: null,
      overview: null,
      address: null,
    });

    setLoading(true);
    try {
      const updateData = { name, overview, address };

      const response = await apiClient.patch<{
        success: boolean;
        message: string;
        data: UpdateBusinessInformationResponse;
      }>(`/businesses/information/${userData?.businessId}`, updateData);

      const updated = response.data.data;

      setBusinessDetails((pv) => {
        if (!pv) return null;

        return {
          ...pv,
          name: updated.name,
          overview: updated.overview || "",
          address: updated.address || "",
        };
      });
      localStorage.setItem(
        "businessDetails",
        JSON.stringify(response.data.data),
      );
      successToast(response.data.message);
    } catch (error: any) {
      console.error(error);
      errorToast(
        error?.response?.data?.error || "Failed to update business info.",
      );
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="h-full w-full divide-y divide-gray-200">
        {/* Header */}
        <div className="flex items-center space-x-3 px-4 py-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
          >
            <i className="fa-solid fa-shop text-white"></i>
          </div>
          <h5 className="text-lg font-bold text-gray-900">
            Business Information
          </h5>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4 px-4 py-3">
          {/* Business Name */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Business Name:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your business name"
                  style={{ backgroundColor: "white", color: "black" }}
                  className="w-full rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {name || "No Business Name"}
                </span>
              )}
              {errors.businessName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Business Overview:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <Textarea
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Write a short overview of your business"
                  rows={3}
                  style={{ backgroundColor: "white", color: "black" }}
                  className="w-full resize-y rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {overview || "No Overview Provided"}
                </span>
              )}
              {errors.overview && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.overview}
                </p>
              )}
            </div>
          </div>

          {/* Business Address */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start">
            <span className="text-md shrink-0 font-bold text-gray-800 sm:w-40">
              Primary Address:
            </span>
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <TextInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter business address"
                  style={{ backgroundColor: "white", color: "black" }}
                  className="w-full rounded-lg text-sm text-gray-800 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <span className="block text-sm font-medium break-words whitespace-normal text-gray-600">
                  {address || "No Address Provided"}
                </span>
              )}
              {errors.address && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 px-4 py-2 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex w-full flex-col justify-end sm:flex-row sm:justify-end">
            {isEditing ? (
              <button
                disabled={loading}
                onClick={handleSave}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 sm:w-auto"
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  backgroundColor: loading ? "grey" : "",
                }}
              >
                <img
                  src={saveIcon}
                  alt="Save Icon"
                  className="h-5 w-5 opacity-90"
                />
                <span>{loading ? "Saving..." : "Save"}</span>
              </button>
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-700 active:scale-95 sm:w-auto"
              >
                <img src={editIcon} alt="Edit Icon" className="h-5 w-5" />
                <span>Edit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetails;
