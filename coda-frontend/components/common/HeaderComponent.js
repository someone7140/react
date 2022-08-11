import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { loginUserState } from "../../atoms/LoginUser";
import { masterState } from "../../atoms/Master";
import { getMasterApi } from "../../services/api/ApiCommonService";

export default function Header() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);

  useEffect(() => {
    if (!master?.master) {
      getMasterApi(setMaster);
    }
  }, []);

  const headerBarStyle = {
    height: 60,
    background: "white",
  };

  return (
    <div style={{ background: "white" }}>
      <header>
        {process.browser && (
          <nav className="fixed-top" style={headerBarStyle}>
            <table
              style={{
                width: "100%",
                height: 60,
                borderBottom: "2px solid #e6e6fa",
              }}
            >
              <tr>
                <td style={{ width: "8%" }}>
                  <img
                    src="/header.png"
                    style={{ width: "80px", height: "50px" }}
                  />
                </td>
                <td style={{ width: "20%" }}>
                  {process.env.DEVELOP_MODE === "true" ? (
                    <span className="text-danger">
                      開発環境
                      <br />
                      (公開禁止)
                    </span>
                  ) : (
                    <></>
                  )}
                </td>
                <td style={{ width: "50%", textAlign: "right" }}>
                  <div>
                    {user && user.loginUser && (
                      <a
                        href="/user/userDetail"
                        style={{ color: "black" }}
                        class="mr-4"
                      >
                        {!user.loginUser.icon_url && (
                          <FontAwesomeIcon
                            icon={faUser}
                            className="fa-2x mt-1 mr-2"
                          />
                        )}
                        {user.loginUser.icon_url && (
                          <img
                            src={user.loginUser.icon_url}
                            className="mt-1 mr-2 rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                          />
                        )}
                      </a>
                    )}
                    {(!user || !user.loginUser) && (
                      <>
                        <span class="mt-1 mr-3">
                          <a
                            href="/auth/authUserForRegister"
                            style={{ color: "black" }}
                          >
                            <button type="button" class="btn-sm btn-primary">
                              会員登録
                            </button>
                          </a>
                        </span>
                        <span class="mt-1 mr-1">
                          <a href="/auth/login" style={{ color: "black" }}>
                            <button type="button" class="btn-sm btn-default">
                              ログイン
                            </button>
                          </a>
                        </span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </nav>
        )}
      </header>
      <br />
      <br />
      <br />
    </div>
  );
}
