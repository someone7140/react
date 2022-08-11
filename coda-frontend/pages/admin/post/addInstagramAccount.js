import HeaderComponent from "../../../components/common/HeaderComponent";
import RegisterInstagramAccountComponent from "../../../components/admin/post/RegisterInstagramAccountComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const AddInstagranAccount = () => (
  <div>
    <ProtectRouteAdmin>
      <HeaderComponent />
      <RegisterInstagramAccountComponent editFlag={false} />
    </ProtectRouteAdmin>
  </div>
);

export default AddInstagranAccount;
