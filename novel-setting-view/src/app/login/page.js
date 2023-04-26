"use client";

import LoginComponent from "components/auth/LoginComponent";

export default function LoginPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ paddingBottom: 15, fontSize: 20 }}>ログイン</div>
      <LoginComponent />
    </div>
  );
}
