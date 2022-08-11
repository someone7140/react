import HeaderComponent from "../../../components/common/HeaderComponent";
import AdminAnalyticsComponent from "../../../components/admin/analytics/AdminAnalyticsComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const AccessAnalytics = () => (
  <div>
    <ProtectRouteAdmin>
      <HeaderComponent />
      <AdminAnalyticsComponent />
    </ProtectRouteAdmin>
  </div>
);

export default AccessAnalytics;
