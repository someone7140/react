import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import UserPolicyComponent from "../../components/policy/UserPolicyComponent";

const Index = () => (
  <div>
    <HeaderComponent />
    <CommonSubHeaderComponent title="利用規約" />
    <UserPolicyComponent />
  </div>
);

export default Index;
