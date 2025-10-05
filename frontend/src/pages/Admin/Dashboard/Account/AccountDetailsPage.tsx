import AccountDetails from "../../../../components/Account/AccountSettings/AccountDetails";
import TitleCard from "../../../../components/TitleCard";

export default function AccountDetailsPage() {
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex flex-col gap-5">
        <TitleCard
          title="Account settings"
          subtitle="Manage your user account preferences and settings all in one place."
          hasButton={false}
        />

        <AccountDetails />
      </div>
    </div>
  );
}
