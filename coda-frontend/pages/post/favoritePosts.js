import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import TopFavoritePostComponent from "../../components/common/post/TopFavoritePostComponent";
import { ProtectRoute } from "../../components/auth/ProtectRoute";

const Index = () => (
  <div>
    <ProtectRoute>
      <HeaderComponent />
      <TopFavoritePostComponent />
      <FooterComponent page="favorite" />
    </ProtectRoute>
  </div>
);

export default Index;
