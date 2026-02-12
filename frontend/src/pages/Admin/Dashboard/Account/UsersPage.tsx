import {
  useTeamInvitations,
  useTeamMembers,
} from "../../../../api/hooks/useTeamQueries";
import TeamMembers from "../../../../components/Account/Users/TeamMember/TeamMembers";
import TeamMembersInvitation from "../../../../components/Account/Users/TeamMembersInvitation/TeamMembersInvitation";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import { appName } from "../../../../theme/appName";
import { BusinessUserInvitationsType } from "../../../../types/BusinessUserInvitationsTypes";
import { BusinessUserType } from "../../../../types/BusinessUsersTypes";

export default function UsersPage() {
  const { userData } = useUserData();

  const { data: membersResponse, isLoading: loadingMembers } = useTeamMembers(
    userData?.businessId,
  );
  const { data: invitationsResponse, isLoading: loadingInvitations } =
    useTeamInvitations(userData?.businessId);

  const businessUsers: BusinessUserType[] | null =
    membersResponse?.data?.map((m) => {
      const user = m.userId && typeof m.userId === "object" ? m.userId : null;
      return {
        _id: m._id,
        role: m.role,
        status: m.status,
        email: m.email || (user ? user.email : ""),
        name: m.name || (user ? `${user.firstName} ${user.lastName}` : ""),
        businessName: m.businessName || "",
      };
    }) || null;

  const businessUserInvitations: BusinessUserInvitationsType[] | null =
    (invitationsResponse?.data as unknown as BusinessUserInvitationsType[]) ||
    null;

  const isLoading = loadingMembers || loadingInvitations;
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading && !businessUsers && !businessUserInvitations ? (
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
