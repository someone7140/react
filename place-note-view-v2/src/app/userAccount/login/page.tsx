import { UserAccountLoginComponent } from "@/components/userAccount/UserAccountLoginComponent";
import { pageTitleStyle } from "@/style/CommonStyle";

export default function Home() {
  return (
    <>
      <div className={pageTitleStyle()}>ログイン</div>
      <UserAccountLoginComponent />
    </>
  );
}
