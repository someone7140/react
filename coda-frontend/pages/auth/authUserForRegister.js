import { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import AuthUserForRegisterComponent from "../../components/auth/register/AuthUserForRegisterComponent";

const AuthUserForRegister = () => {
  const router = useRouter();
  const { favoritePostInfo } = router.query;
  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent title="会員登録" />
      {favoritePostInfo === "true" && (
        <>
          <div className="text-center text-danger">
            <span>いいね一覧の参照は会員登録が必要です</span>
          </div>
          <br />
        </>
      )}
      <AuthUserForRegisterComponent />
    </div>
  );
};

export default AuthUserForRegister;
