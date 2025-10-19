/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import loadingGif from "../../../../assets/image/loadingGif.gif";
import TeamMembers from "../../../../components/Account/Users/TeamMembers";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { BusinessUsersDetailsType } from "../../../../types/BusinessUsersTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function UsersPage() {
  const apiClient = useApiClient();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [businessUsers, setBusinessUsers] =
    useState<BusinessUsersDetailsType | null>(null);

  const fetchBusinessUsersDetails = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<{
        success: boolean;
        message: string;
        data: BusinessUsersDetailsType;
      }>("/business-users/" + userData?.businessId);

      setBusinessUsers(response.data.data);
      successToast(response.data.message);
    } catch (error: any) {
      errorToast(
        error?.response?.data?.error || "Failed to update business info.",
      );
    } finally {
      setLoading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    fetchBusinessUsersDetails();
  }, []);
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !businessUsers ? (
        <div className="w-hull bg-blue flex h-full items-center justify-center">
          <img src={loadingGif} />
        </div>
      ) : (
        businessUsers && (
          <div className="flex flex-col gap-5">
            <TitleCard
              title="User Management"
              subtitle={`Add additional users to ${appName} account.`}
              hasButton={false}
            />

            <TeamMembers businessUsers={businessUsers} />
          </div>
        )
      )}
    </div>
  );
}
