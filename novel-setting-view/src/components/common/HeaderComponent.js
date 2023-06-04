import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useQuery } from "@tanstack/react-query";

import { useAuthTokenStorage } from "hooks/localStorage/useAuthTokenStorage";
import { useAuthStore } from "hooks/store/useAuthStore";
import { authByToken } from "services/api/ApiAuthService";

export default function HeaderComponent() {
  const router = useRouter();
  const menu = useRef(null);
  const toast = useRef(null);
  const authStore = useAuthStore();
  const { authToken, removeAuthToken } = useAuthTokenStorage();
  const { refetch: authByTokenApi } = useQuery(
    ["authByToken"],
    async () => {
      return await authByToken(authToken);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onError: (_) => {
        removeAuthToken();
      },
    }
  );

  useEffect(() => {
    (async () => {
      if (authToken && !authStore.userAccount) {
        const result = await authByTokenApi();
        authStore.setUserAccount({ ...result.data, token: authToken });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const topLink = {
    label: "Top",
    command: () => {
      router.push("/");
    },
  };
  const userAccountRegisterLink = {
    label: "会員登録",
    command: () => {
      router.push("/userAccountRegister");
    },
  };
  const loginLink = {
    label: "ログイン",
    command: () => {
      router.push("/login");
    },
  };
  const logoutLink = {
    label: "ログアウト",
    command: () => {
      authStore.removeUserAccount();
      removeAuthToken();
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "ログアウトしました",
        life: 3000,
      });
      router.push("/");
    },
  };
  const novelSetting = {
    label: "小説管理",
    command: () => {
      router.push("/novel/top");
    },
  };

  const notLoginMenus = [topLink, userAccountRegisterLink, loginLink];
  const loginMenus = [topLink, novelSetting, logoutLink];
  const menuItems = authStore.userAccount ? loginMenus : notLoginMenus;

  return (
    <>
      <Toast ref={toast} />
      <div
        style={{
          height: 50,
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: 15 }}>
          <Menu model={menuItems} popup ref={menu} />
          <i
            className="pi pi-bars"
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={(e) => menu.current.toggle(e)}
          />
        </div>
        <div style={{ fontSize: 25 }}>小説作成支援ツール</div>
        <div>
          {authStore.userAccount && (
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ marginRight: 10 }}>
                <i className="pi pi-user" style={{ fontSize: "1rem" }}></i>
              </div>
              <div style={{ marginRight: 5 }}>
                {authStore.userAccount.displayAccount}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
