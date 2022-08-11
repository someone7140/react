import { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import PasswordResetUpdateComponent from "../../components/auth/password/PasswordResetUpdateComponent";

const PasswordResetAuth = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { user_id, token } = router.query;
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
      <br />
      <PasswordResetUpdateComponent userId={user_id} token={token} />
    </div>
  );
};

export default PasswordResetAuth;
