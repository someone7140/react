import { useRouter } from "next/router";
import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import CoordinateTopComponent from "../../components/coordinate/CoordinateTopComponent";

const CoordinateList = () => {
  const router = useRouter();
  const { shopSettingId } = router.query;
  return (
    <div>
      <HeaderComponent />
      <CoordinateTopComponent shopSettingId={shopSettingId} />
      <FooterComponent />
    </div>
  );
};

export default CoordinateList;
