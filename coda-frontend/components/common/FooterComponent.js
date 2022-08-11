import React from "react";
import Router from "next/router";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";
import { CODA_LINE_URL } from "./LineAccountLink";

export default function FooterComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);

  const footerBarStyle = {
    height: 55,
    maxWidth: 550,
    border: "2px solid #f0f8ff",
    background: "white",
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      style={{ color: "black" }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  function logout() {
    setUser("");
    toast("ログアウトしました");
    Router.push("/");
    location.reload();
  }

  return (
    <div>
      <footer>
        <nav className="fixed-bottom" style={footerBarStyle}>
          <table style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "25%", height: 50 }}>
                <a className="align-middle" href="/" class="mt-2">
                  {prop.page === "top" && (
                    <img
                      src="/home_select.jpeg"
                      style={{ width: 35, height: 35, marginLeft: "25%" }}
                    />
                  )}
                  {prop.page !== "top" && (
                    <img
                      src="/home_non_select.jpeg"
                      style={{ width: 35, height: 35, marginLeft: "25%" }}
                    />
                  )}
                </a>
              </td>
              <td style={{ width: "25%" }}>
                <a href={"/search/searchPosts"} class="ml-3">
                  {prop.page === "search" && (
                    <img
                      src="/search_icon_selected.png"
                      style={{ width: 40, height: 40 }}
                    />
                  )}
                  {prop.page !== "search" && (
                    <img
                      src="/search_icon_non_select.png"
                      style={{ width: 40, height: 40 }}
                    />
                  )}
                </a>
              </td>
              <td style={{ width: "25%" }}>
                {(!user || !user.loginUser) && (
                  <a
                    href="/auth/authUserForRegister?favoritePostInfo=true"
                    class="ml-3"
                  >
                    {prop.page === "favorite" && (
                      <img
                        src="/heart_select.jpeg"
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                    {prop.page !== "favorite" && (
                      <img
                        src="/heart_non_select.jpeg"
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                  </a>
                )}
                {user && user.loginUser && (
                  <a href="/post/favoritePosts" class="ml-3">
                    {prop.page === "favorite" && (
                      <img
                        src="/heart_select.jpeg"
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                    {prop.page !== "favorite" && (
                      <img
                        src="/heart_non_select.jpeg"
                        style={{ width: 40, height: 40 }}
                      />
                    )}
                  </a>
                )}
              </td>
              <td style={{ width: "15%" }}>
                <div class="ml-8">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <img
                        src="/footer_menu.jpeg"
                        style={{ width: 35, height: 35 }}
                      />
                    </Dropdown.Toggle>
                    {(!user || !user.loginUser) && (
                      <Dropdown.Menu>
                        <Dropdown.Item href="/auth/login">
                          ログイン
                        </Dropdown.Item>
                        <Dropdown.Item href="/auth/authUserForRegister">
                          会員登録
                        </Dropdown.Item>
                        <Dropdown.Item href={CODA_LINE_URL}>
                          お問い合わせ
                        </Dropdown.Item>
                        <Dropdown.Item href="/policy/userPolicy">
                          利用規約
                        </Dropdown.Item>
                        <Dropdown.Item href="/policy/privacyPolicy">
                          プライバシーポリシー
                        </Dropdown.Item>
                        <Dropdown.Item href="/common/tutorial">
                          チュートリアル
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                    {user && user?.loginUser?.user_type && (
                      <Dropdown.Menu>
                        {/*{user?.loginUser?.user_type == "admin" && (
                          <>
                            <Dropdown.Item href="/admin/post/notsetStatusPosts">
                              タイムライン投稿管理
                            </Dropdown.Item>
                            <Dropdown.Item href="/admin/analytics/favoriteAnalytics">
                              インスタグラム投稿いいね状況
                            </Dropdown.Item>
                          </>
                        )}*/}
                        {user?.loginUser?.user_type == "admin" && (
                          <>
                            <Dropdown.Item href="/admin/shop/shopList">
                              ショップ管理
                            </Dropdown.Item>
                            <Dropdown.Item href="/admin/coordinate/adminCoordinateList">
                              コーディネート管理
                            </Dropdown.Item>
                            <Dropdown.Item href="/admin/analytics/accessAnalytics">
                              アクセス状況
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item href="/user/userDetail">
                          アカウント情報
                        </Dropdown.Item>
                        <Dropdown.Item
                          href={
                            "/itemPost/userPosts?userSettingId=" +
                            user.loginUser?.user_setting_id
                          }
                        >
                          ユーザ投稿管理
                        </Dropdown.Item>
                        {user?.loginUser?.auth_method == "email" && (
                          <Dropdown.Item href="/auth/passwordChange">
                            パスワード変更
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={logout}>
                          ログアウト
                        </Dropdown.Item>
                        <Dropdown.Item href={CODA_LINE_URL}>
                          お問い合わせ
                        </Dropdown.Item>
                        <Dropdown.Item href="/policy/userPolicy">
                          利用規約
                        </Dropdown.Item>
                        <Dropdown.Item href="/policy/privacyPolicy">
                          プライバシーポリシー
                        </Dropdown.Item>
                        <Dropdown.Item href="/common/tutorial">
                          チュートリアル
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>
              </td>
            </tr>
          </table>
        </nav>
      </footer>
      <br />
      <br />
      <br />
    </div>
  );
}
