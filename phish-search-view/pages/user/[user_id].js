import { useRouter } from "next/router";
import Header from "../../components/common/Header";
import UserRefer from "../../components/user/UserRefer";

const Index = () => {
  const router = useRouter();
  // パスパラメータから値を取得
  const { user_id } = router.query;
  return (
    <div>
      <Header />
      <UserRefer userId={user_id} />
    </div>
  );
};

export default Index;
