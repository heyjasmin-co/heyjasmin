import { AxiosError } from "axios";
import { useUserFetch } from "../../../../api/hooks/useUserQueries";
import AccountDetails from "../../../../components/Account/AccountSettings/AccountDetails";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { UserDetailsType } from "../../../../types/UsersTypes";
import { errorToast } from "../../../../utils/react-toast";

export default function AccountDetailsPage() {
  const { userData } = useUserData();
  const {
    data: userResponse,
    isLoading,
    isError,
    error: fetchError,
  } = useUserFetch(userData?.clerkId);

  const accountInformation = userResponse?.data as unknown as UserDetailsType;

  if (isError) {
    const axiosError = fetchError as AxiosError<{ error: string }>;
    const message =
      axiosError.response?.data?.error || "Failed to fetch account details";
    errorToast(message);
  }

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading ? (
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
