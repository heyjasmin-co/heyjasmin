/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountDetails from "../../../../components/Account/AccountSettings/AccountDetails";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { useGetUserDetails } from "../../../../hooks/api/useUserQueries";

export default function AccountDetailsPage() {
  const { userData } = useUserData();

  const { data: accountInformation, isLoading: loading } = useGetUserDetails(
    userData?.clerkId ? userData?.clerkId : undefined,
  );

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
