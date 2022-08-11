import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import PasswordChangeComponent from "../../components/auth/password/PasswordChangeComponent";
import { ProtectRoute } from "../../components/auth/ProtectRoute";

const PasswordChange = () => {
  return (
    <div>
      <ProtectRoute>
        <HeaderComponent />
        <CommonSubHeaderComponent title="パスワード変更" />
        <br />
        <PasswordChangeComponent />
      </ProtectRoute>
    </div>
  );
};

export default PasswordChange;
