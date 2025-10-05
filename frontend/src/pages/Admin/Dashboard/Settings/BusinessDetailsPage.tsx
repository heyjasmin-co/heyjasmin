import TrainingSources from "../../../../components/dashboard/TrainingSources";
import BusinessDetails from "../../../../components/settings/BusinessDetails";
import BusinessHours from "../../../../components/settings/BusinessHours";
import CoreService from "../../../../components/settings/CoreService";
import TitleCard from "../../../../components/TitleCard";

export default function BusinessDetailsPage() {
  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div className="flex flex-col gap-5">
        <TitleCard
          title="Business Information"
          subtitle="This business information gives Rosie the context to handle your calls."
        />

        <TrainingSources businessProfile={""} businessWebsite={""} />
        <BusinessDetails businessProfile={""} businessWebsite={""} />
        <CoreService />
        <BusinessHours />
      </div>
    </div>
  );
}
