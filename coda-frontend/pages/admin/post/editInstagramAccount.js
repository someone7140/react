import { useRouter } from "next/router";
import HeaderComponent from "../../../components/common/HeaderComponent";
import RegisterInstagramAccountComponent from "../../../components/admin/post/RegisterInstagramAccountComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const EditInstagranAccount = () => {
  const router = useRouter();
  // パラメータから値を取得
  const { instagram_user_name } = router.query;
  return (
    <div>
      <ProtectRouteAdmin>
        <HeaderComponent />
        <RegisterInstagramAccountComponent
          instagramUserName={instagram_user_name}
          editFlag={true}
        />
      </ProtectRouteAdmin>
    </div>
  );
};

export default EditInstagranAccount;
