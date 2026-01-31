import TeamMembers from "../../../../components/Account/Users/TeamMember/TeamMembers";
import TeamMembersInvitation from "../../../../components/Account/Users/TeamMembersInvitation/TeamMembersInvitation";
import Loading from "../../../../components/Loading";
import { useUserData } from "../../../../context/UserDataContext";
import { useTeammates, useUserInvitations } from "../../../../hooks/useUser";

export default function UsersPage() {
  const { userData } = useUserData();

  const { data: businessUsers, isLoading: usersLoading } = useTeammates(
    userData?.businessId ?? undefined,
  );
  const { data: invitations, isLoading: invitationsLoading } =
    useUserInvitations(userData?.businessId ?? undefined);

  const isLoading = usersLoading || invitationsLoading;

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      {isLoading && !businessUsers && !invitations ? (
        <Loading />
      ) : (
        businessUsers &&
        invitations && (
          <div className="flex flex-col gap-8">
            <TeamMembers businessUsers={businessUsers} />
            <TeamMembersInvitation businessUserInvitations={invitations} />
          </div>
        )
      )}
    </div>
  );
}
