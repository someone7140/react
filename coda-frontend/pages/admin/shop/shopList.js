import FooterComponent from "../../../components/common/FooterComponent";
import HeaderComponent from "../../../components/common/HeaderComponent";
import ShopTopComponent from "../../../components/admin/shop/ShopTopComponent";
import CommonSubHeaderComponent from "../../../components/common/CommonSubHeaderComponent";
import { ProtectRouteAdmin } from "../../../components/auth/ProtectRouteAdmin";

const ShopList = () => {
  return (
    <div>
      <ProtectRouteAdmin>
        <HeaderComponent />
        <CommonSubHeaderComponent title="ショップ管理" />
        <ShopTopComponent />
        <FooterComponent />
      </ProtectRouteAdmin>
    </div>
  );
};

export default ShopList;
