/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TeamMembers from "../../../../components/Account/Users/TeamMember/TeamMembers";
import TeamMembersInvitation from "../../../../components/Account/Users/TeamMembersInvitation/TeamMembersInvitation";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { useApiClient } from "../../../../lib/axios";
import { appName } from "../../../../theme/appName";
import { BusinessUserInvitationsType } from "../../../../types/BusinessUserInvitationsTypes";
import { BusinessUsersDetailsType } from "../../../../types/BusinessUsersTypes";
import { errorToast, successToast } from "../../../../utils/react-toast";

export default function UsersPage() {
  const apiClient = useApiClient();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [businessUsers, setBusinessUsers] =
    useState<BusinessUsersDetailsType | null>(null);
  const [businessUserInvitations, setBusinessUserInvitations] = useState<
    BusinessUserInvitationsType[] | null
  >(null);

  const fetchUsersDetails = async () => {
    setLoading(true);
    try {
      const [businessUsers, businessUserInvitations] = await Promise.all([
        apiClient.get<{
          success: boolean;
          message: string;
          data: BusinessUsersDetailsType;
        }>("/business-users/" + userData?.businessId),
        apiClient.get<{
          success: boolean;
          message: string;
          data: BusinessUserInvitationsType[];
        }>("/business-user-invitations/" + userData?.businessId),
      ]);
      console.log("businessUserInvitations", businessUserInvitations);
      setBusinessUsers(businessUsers.data.data);
      setBusinessUserInvitations(businessUserInvitations.data.data);
      successToast("Business User Information fetch Successfully");
    } catch (error: any) {
      errorToast(
        error?.response?.data?.error ||
          "Failed to fetch Business Users Information.",
      );
    } finally {
      setLoading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    fetchUsersDetails();
  }, []);
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {loading && !businessUsers && !businessUserInvitations ? (
        <Loading />
      ) : (
        businessUsers &&
        businessUserInvitations && (
          <div className="flex flex-col gap-5">
            <TitleCard
              title="User Management"
              subtitle={`Add additional users to ${appName} account.`}
              hasButton={false}
            />

            <TeamMembers businessUsers={businessUsers} />
            <TeamMembersInvitation
              businessUserInvitations={businessUserInvitations}
            />
          </div>
        )
      )}
    </div>
  );
}
