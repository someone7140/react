import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  return (
    <>
      <div className={pageTitleStyle()}>ユーザー登録</div>
      <UserAccountRegisterComponent />
    </>
  );
}
