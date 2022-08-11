import { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import CoordinateByItemIdComponent from "../../components/coordinate/CoordinateByItemIdComponent";

const CoordinatePost = () => {
  const router = useRouter();
  const { coordinateId } = router.query;
  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent title="コーデ投稿" />
      <CoordinateByItemIdComponent coordinateId={coordinateId} />
    </div>
  );
};

export default CoordinatePost;
