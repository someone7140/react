import FooterComponent from "../../../components/common/FooterComponent";
import HeaderComponent from "../../../components/common/HeaderComponent";
import NotSetStatusPostsComponent from "../../../components/admin/post/NotSetStatusPostsComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const NotSetStatusPosts = () => (
  <div>
    <ProtectRouteAdmin>
      <HeaderComponent />
      <NotSetStatusPostsComponent />
      <FooterComponent />
    </ProtectRouteAdmin>
  </div>
);

export default NotSetStatusPosts;
