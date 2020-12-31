import Header from "../../components/common/Header";
import { ProtectRoute } from "../../components/auth/ProtectRoute";
import PostCreate from "../../components/post/PostCreate";

const CreatePage = () => {
  return (
    <div>
      <ProtectRoute>
        <Header />
        <PostCreate />
      </ProtectRoute>
    </div>
  );
};

export default CreatePage;
