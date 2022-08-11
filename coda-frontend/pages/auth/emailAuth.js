import { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import EmailAuthTokenComponent from "../../components/auth/register/EmailAuthTokenComponent";

const EmailAuth = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { user_id, token } = router.query;
  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent title="会員登録" />
      <EmailAuthTokenComponent userId={user_id} token={token} />
    </div>
  );
};

export default EmailAuth;
