import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import DeleteAccountComponent from "../../components/user/DeleteAccountComponent";
import { ProtectRoute } from "../../components/auth/ProtectRoute";

const DeleteAccount = () => {
  return (
    <div>
      <ProtectRoute>
        <HeaderComponent />
        <CommonSubHeaderComponent title="退会" />
        <DeleteAccountComponent />
      </ProtectRoute>
    </div>
  );
};

export default DeleteAccount;
