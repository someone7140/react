import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  return (
    <>
      <div className={pageTitleStyle()}>会員登録</div>
      <UserAccountRegisterComponent />
    </>
  );
}
