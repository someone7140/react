import Router, { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { loginUserState } from "../../atoms/LoginUser";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import ItemPostListByUserComponent from "../../components/itemPost/ItemPostListByUserComponent";

const Index = () => {
  const [user, setUser] = useRecoilState(loginUserState);
  const router = useRouter();
  const { userSettingId } = router.query;

  if (!userSettingId) {
    Router.push("/");
  }

  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent
        title={
          <span className="h3">
            {userSettingId}さんの
            <br />
            アイテム投稿
          </span>
        }
        height="80px"
      />
      <br />
      <ItemPostListByUserComponent userSettingId={userSettingId} />
      {user?.loginUser?.user_setting_id == userSettingId && (
        <FooterComponent page="itemPost" />
      )}
    </div>
  );
};

export default Index;
