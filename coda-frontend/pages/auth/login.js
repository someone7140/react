import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import LoginComponent from "../../components/auth//login/LoginComponent";

const Login = () => (
  <div>
    <HeaderComponent />
    <CommonSubHeaderComponent title="ログイン" />
    <LoginComponent />
  </div>
);

export default Login;
