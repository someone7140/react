import { useRouter } from "next/router";
import FooterComponent from "../../../components/common/FooterComponent";
import HeaderComponent from "../../../components/common/HeaderComponent";
import RefInstagramAccountComponent from "../../../components/admin/post/RefInstagramAccountComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const RefInstagramAccount = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { instagram_user_name } = router.query;
  return (
    <div>
      <ProtectRouteAdmin>
        <HeaderComponent />
        <RefInstagramAccountComponent instagramUserName={instagram_user_name} />
        <FooterComponent />
      </ProtectRouteAdmin>
    </div>
  );
};

export default RefInstagramAccount;
