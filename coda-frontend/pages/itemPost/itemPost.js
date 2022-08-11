import Router, { useRouter } from "next/router";
import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import ItemPostListByItemIdComponent from "../../components/itemPost/ItemPostListByItemIdComponent";

const Index = () => {
  const router = useRouter();
  const { itemPostId } = router.query;

  if (!itemPostId) {
    Router.push("/");
  }

  return (
    <div>
      <HeaderComponent />
      <CommonSubHeaderComponent title="アイテム投稿" />
      <ItemPostListByItemIdComponent itemPostId={itemPostId} />
    </div>
  );
};

export default Index;
