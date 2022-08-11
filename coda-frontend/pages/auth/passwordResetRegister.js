import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import PasswordResetRegsiterComponent from "../../components/auth/password/PasswordResetRegsiterComponent";

const PasswordResetRegsiter = () => {
  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent
        title={
          <span>
            パスワード
            <br />
            リセット
          </span>
        }
      />
      <br />
      <PasswordResetRegsiterComponent />
    </div>
  );
};

export default PasswordResetRegsiter;
