import { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import UserRegisterComponent from "../../components/user/UserRegisterComponent";

const NewUserRegister = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { googleIdToken, facebookAccessToken } = router.query;
  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent title="会員登録" />
      <UserRegisterComponent
        googleIdToken={googleIdToken}
        facebookAccessToken={facebookAccessToken}
      />
    </div>
  );
};

export default NewUserRegister;
