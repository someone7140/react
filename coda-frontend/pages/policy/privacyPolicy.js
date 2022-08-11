import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import PrivacyPolicyComponent from "../../components/policy/PrivacyPolicyComponent";

const Index = () => (
  <div>
    <HeaderComponent />
    <CommonSubHeaderComponent title="プライバシーポリシー" />
    <PrivacyPolicyComponent />
  </div>
);

export default Index;
