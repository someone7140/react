import HeaderComponent from "../../../components/common/HeaderComponent";
import CommonSubHeaderComponent from "../../../components/common/CommonSubHeaderComponent";
import FavoriteInstagramAnalyticsComponent from "../../../components/admin/analytics/FavoriteInstagramAnalyticsComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const AccessAnalytics = () => (
  <div>
    <ProtectRouteAdmin>
      <HeaderComponent />
      <CommonSubHeaderComponent title="Instagramいいね状況" />
      <FavoriteInstagramAnalyticsComponent />
    </ProtectRouteAdmin>
  </div>
);

export default AccessAnalytics;
