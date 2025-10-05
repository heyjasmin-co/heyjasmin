import TeamMembers from "../../../../components/Account/Users/TeamMembers";
import TitleCard from "../../../../components/TitleCard";
import { appName } from "../../../../theme/appName";

export default function UsersPage() {
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex flex-col gap-5">
        <TitleCard
          title="User Management"
          subtitle={`Add additional users to ${appName} account.`}
          hasButton={false}
        />

        <TeamMembers />
      </div>
    </div>
  );
}
