import { useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { Drawer, MenuItem } from "@material-ui/core";
import { loginUserState } from "../../atoms/LoginUser";
import { logoutUser } from "../../services/api/ApiUserService";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(loginUserState);

  const headerBarStyle = {
    height: 55,
    background: "mediumaquamarine",
  };
  const titleStyle = {
    fontSize: 17,
    marginLeft: 13,
    color: "black",
  };

  const nameStyle = {
    fontSize: 11,
    color: "black",
  };

  function burgerClick() {
    setMenuOpen(!menuOpen);
  }

  const logout = () => {
    logoutUser();
    setUser({ loginUser: undefined });
    Router.replace("/");
    Router.reload();
  };

  return (
    <div>
      <header>
        <nav className="fixed-top" style={headerBarStyle}>
          <table style={{ width: "95%" }}>
            <tr>
              <td style={{ width: "40%" }}>
                <a className="align-middle" style={titleStyle} href="/">
                  PhishSiteSearch
                </a>
              </td>
              <td style={{ width: "55%" }}>
                {user && user.loginUser && (
                  <span style={nameStyle}>
                    「{user.loginUser.name} 」さんでログイン
                  </span>
                )}
              </td>
              <td style={{ width: "5%" }}>
                <Burger isOpen={menuOpen} onClick={burgerClick} />
              </td>
            </tr>
          </table>
        </nav>
      </header>
      <Drawer open={menuOpen} docked={false} width={200} onClose={burgerClick}>
        {(!user || !user.loginUser) && (
          <>
            <MenuItem>
              <a href="/auth/login">ログイン</a>
            </MenuItem>
            <MenuItem>
              <a href="/user/create">会員登録</a>
            </MenuItem>
          </>
        )}
        {user && user.loginUser && (
          <>
            <MenuItem>
              <a href="/post/create">フィッシュサイト投稿</a>
            </MenuItem>
            <MenuItem>
              <a href="#" onClick={logout}>
                ログアウト
              </a>
            </MenuItem>
          </>
        )}
      </Drawer>
      <br />
      <br />
      <br />
    </div>
  );
}
