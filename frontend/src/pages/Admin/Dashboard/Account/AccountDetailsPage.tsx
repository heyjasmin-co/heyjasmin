import AccountDetails from "../../../../components/Account/AccountSettings/AccountDetails";
import Loading from "../../../../components/Loading";
import { useUserData } from "../../../../context/UserDataContext";
import { useUserDetails } from "../../../../hooks/useUser";

export default function AccountDetailsPage() {
  const { userData } = useUserData();
  const { data: user, isLoading } = useUserDetails(
    userData?.clerkId ?? undefined,
  );

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading && !user ? (
        <Loading />
      ) : user ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Account Details</h1>
            <p className="text-gray-500">
              View and manage your account information.
            </p>
          </div>
          <AccountDetails accountInformation={user} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-gray-500">
          No account information found.
        </div>
      )}
    </div>
  );
}
