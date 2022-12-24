import AnnouncementListComponent from "../announcement/AnnouncementListComponent";
import OpenUserAccountListComponent from "../userAccount/OpenUserAccountListComponent";

export default function TopComponent() {
  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div>
        <AnnouncementListComponent />
      </div>
      <div className="mt-8">
        <OpenUserAccountListComponent />
      </div>
    </div>
  );
}
