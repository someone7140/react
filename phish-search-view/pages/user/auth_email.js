import { Router, useRouter } from "next/router";
import Header from "../../components/common/Header";
import UserAuthEmail from "../../components/user/UserAuthEmail";

const Index = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { user_id, token } = router.query;
  return (
    <div>
      <Header />
      <UserAuthEmail userId={user_id} token={token} />
    </div>
  );
};

export default Index;
