import FooterComponent from "../../../components/common/FooterComponent";
import HeaderComponent from "../../../components/common/HeaderComponent";
import CoordinateTopComponent from "../../../components/coordinate/CoordinateTopComponent";
import CommonSubHeaderComponent from "../../../components/common/CommonSubHeaderComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const AdminCoordinateList = () => {
  return (
    <div>
      <ProtectRouteAdmin>
        <HeaderComponent />
        <CommonSubHeaderComponent title="コーデ管理" />
        <CoordinateTopComponent adminFlag={true} />
        <FooterComponent />
      </ProtectRouteAdmin>
    </div>
  );
};

export default AdminCoordinateList;
