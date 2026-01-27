/* eslint-disable @typescript-eslint/no-explicit-any */
import TeamMembers from "../../../../components/Account/Users/TeamMember/TeamMembers";
import TeamMembersInvitation from "../../../../components/Account/Users/TeamMembersInvitation/TeamMembersInvitation";
import Loading from "../../../../components/Loading";
import TitleCard from "../../../../components/TitleCard";
import { useUserData } from "../../../../context/UserDataContext";
import {
  useGetBusinessUserInvitations,
  useGetBusinessUsers,
} from "../../../../hooks/api/useTeamQueries";
import { appName } from "../../../../theme/appName";

export default function UsersPage() {
  const { userData } = useUserData();

  const { data: businessUsers, isLoading: loadingUsers } = useGetBusinessUsers(
    userData?.businessId || null,
  );
  const { data: businessUserInvitations, isLoading: loadingInvitations } =
    useGetBusinessUserInvitations(userData?.businessId || null);

  const loading = loadingUsers || loadingInvitations;

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
