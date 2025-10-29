/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from "react";
import AccountDetails from "../../../../components/Account/AccountSettings/AccountDetails";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { UserDetailsType } from "../../../../types/UsersTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function AccountDetailsPage() {
  const apiClient = useApiClient();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [accountInformation, setAccountInformation] =
    useState<UserDetailsType | null>(null);
  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: UserDetailsType;
      }>("/users/" + userData?.clerkId);

      const accountInfo = response.data.data;
      setAccountInformation(accountInfo);
      successToast(response.data.message);
    } catch (error: any) {
      const message = error.response.data.error;
      errorToast(message);
    } finally {
      setLoading(false);
    }
  };
  // UseEffect
  useLayoutEffect(() => {
    fetchAccountDetails();
  }, []);
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !accountInformation ? (
        <Loading />
      ) : accountInformation ? (
        <div className="flex flex-col gap-5">
          <TitleCard
            title="Account Settings"
            subtitle="Manage your user account preferences and settings all in one place."
            hasButton={false}
          />
          <AccountDetails accountInformation={accountInformation} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">
          No account information found.
        </div>
      )}
    </div>
  );
}
