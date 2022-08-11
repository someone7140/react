import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { masterState } from "../../atoms/Master";

import { loginUserState } from "../../atoms/LoginUser";

import CommonSubHeaderComponent from "../../components/common/CommonSubHeaderComponent";
import UserRegisterComponent from "./UserRegisterComponent";
import { getUserDetail } from "../../services/api/ApiUserService";
import { getDateStrDisplayExceptTime } from "../../services/common/DateService";

export default function UserDetailComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [userDetail, setUserDetail] = useState(undefined);
  const [showUserDetail, setShowUserDetail] = useState(true);
  const [showUserChange, setShowUserChange] = useState(false);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetail(setUserDetail, setError, user, setLoading);
  }, []);

  function refetchUserDetail() {
    setShowUserChange(false);
    setShowUserDetail(true);
    getUserDetail(setUserDetail, setError, user, setLoading);
  }
  function displayChange() {
    setShowUserDetail(false);
    setShowUserChange(true);
  }

  function displayDetail() {
    setShowUserChange(false);
    setShowUserDetail(true);
  }

  const headerBarStyle = {
    marginTop: "60px",
    background: "white",
    width: "100%",
  };

  const detailTrStyle = {
    width: "300px",
    textAlign: "left",
  };

  const detailTdTitleStyle = {
    backgroundColor: "gainsboro",
    width: "120px",
  };

  const detailTdVlueStyle = {
    width: "180px",
  };

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  return (
    <>
      <div>
        {loading && loader}
        {!loading && showUserDetail && userDetail && master.master && (
          <div>
            <header>
              <nav className="fixed-top" style={headerBarStyle}>
                <table style={{ width: "100%" }}>
                  <tr>
                    <td style={{ width: "15%" }}>
                      <div
                        style={{
                          position: "relative",
                          left: "10px",
                        }}
                        class="mt-1"
                      >
                        <a href="/">
                          <img src="/leftArrow.png" width="25px" />
                        </a>
                      </div>
                    </td>
                    <td style={{ width: "60%" }}>
                      <div
                        className="h3 mb-1"
                        style={{
                          position: "relative",
                          top: "7px",
                        }}
                      >
                        アカウント情報
                      </div>
                    </td>
                    <td>
                      <div class="mt-1">
                        <button
                          type="button"
                          class="btn-sm btn-default"
                          onClick={displayChange}
                        >
                          設定変更
                        </button>
                      </div>
                    </td>
                  </tr>
                </table>
              </nav>
              <br />
              <br />
              <hr color="#e6e6fa" />
            </header>
            <div className="text-center">
              <table
                border="1"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>ユーザID</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.user_setting_id}
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>表示名</td>
                  <td style={detailTdVlueStyle}>{userDetail.name}</td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>性別</td>
                  <td style={detailTdVlueStyle}>
                    {
                      master.master.gender.find(
                        (g) => g.value === userDetail.gender
                      )?.label
                    }
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>生年月日</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.birth_date
                      ? getDateStrDisplayExceptTime(userDetail.birth_date)
                      : "-"}
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>体型</td>
                  <td style={detailTdVlueStyle}>
                    {
                      master.master.silhouette.find(
                        (s) => s.value === userDetail.silhouette
                      )?.label
                    }
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>身長</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.height && userDetail.height > 0
                      ? userDetail.height + "cm"
                      : "-"}
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>体重</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.weight && userDetail.weight > 0
                      ? userDetail.weight + "kg"
                      : "-"}
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>好きなジャンル</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.genres && userDetail.genres.length > 0
                      ? userDetail.genres
                          .map(
                            (g) =>
                              master.master.genre.find((mg) => mg.value === g)
                                ?.label
                          )
                          .join("・")
                      : "-"}
                  </td>
                </tr>
                <tr style={detailTrStyle}>
                  <td style={detailTdTitleStyle}>コンプレックス</td>
                  <td style={detailTdVlueStyle}>
                    {userDetail.complexes && userDetail.complexes.length > 0
                      ? userDetail.complexes
                          .map(
                            (c) =>
                              master.master.complex.find((mc) => mc.value === c)
                                ?.label
                          )
                          .join("・")
                      : "-"}
                  </td>
                </tr>
              </table>
              <br />
              退会する場合は<a href="/user/deleteAccount">こちら</a>
            </div>
          </div>
        )}
        {showUserDetail && error && (
          <div>
            <br />
            <div className="text-danger">ユーザの取得に失敗しました。</div>
          </div>
        )}
        {showUserChange && !showUserDetail && (
          <>
            <CommonSubHeaderComponent title="登録情報変更" />
            <UserRegisterComponent
              userDetail={userDetail}
              refetchUserDetail={refetchUserDetail}
            />
          </>
        )}
      </div>
    </>
  );
}
