import HeaderComponent from "../../components/common/HeaderComponent";
import UserDetailComponent from "../../components/user/UserDetailComponent";
import { ProtectRoute } from "../../components/auth/ProtectRoute";

const UuserDetail = () => {
  return (
    <div>
      <ProtectRoute>
        <HeaderComponent />
        <UserDetailComponent />
      </ProtectRoute>
    </div>
  );
};

export default UuserDetail;
