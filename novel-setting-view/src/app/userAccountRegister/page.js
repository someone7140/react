"use client";

import UserAccountRegisterComponent from "components/auth/UserAccountRegisterComponent";

export default function UserAccountRegisterPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ paddingBottom: 15, fontSize: 20 }}>会員登録</div>
      <UserAccountRegisterComponent />
    </div>
  );
}
