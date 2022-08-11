import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../../atoms/LoginUser";
import { getAccessAnalytics } from "../../../services/api/ApiAnalyticsService";

export default function AccessAnalyticsComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [accessAnalyticsData, setAccessAnalyticsData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccessAnalytics(setAccessAnalyticsData, setError, user, setLoading);
  }, []);

  const detailThStyle = {
    backgroundColor: "gainsboro",
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
        {!loading && accessAnalyticsData && (
          <div>
            <div className="text-center">
              <table
                border="1"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <tr>
                  <td style={detailThStyle}>日付</td>
                  <td style={detailThStyle}>総会員数</td>
                  <td style={detailThStyle}>ログイン会員数</td>
                  <td style={detailThStyle}>
                    <a href={process.env.GOOGE_ANALYTICS_URL} target="_blank">
                      Google Analytics
                    </a>
                    <br />
                    アクセスユーザ数(非会員含む)
                  </td>
                  <td style={detailThStyle}>
                    <a href={process.env.CODA_INSTAGRAM_URL} target="_blank">
                      Instagram
                    </a>
                    <br />
                    フォロワー数
                  </td>
                  <td style={detailThStyle}>
                    <a href={process.env.CODA_TWITTER_URL} target="_blank">
                      Twitter
                    </a>
                    <br />
                    フォロワー数
                  </td>
                </tr>
                {accessAnalyticsData.map((a) => {
                  return (
                    <tr>
                      <td>{a._id}</td>
                      <td>{a.total_user_count}</td>
                      <td>{a.login_user_count}</td>
                      <td>{a.access_user_count}</td>
                      <td>{a.instagram_follower_count}</td>
                      <td>{a.twitter_follower_count}</td>
                    </tr>
                  );
                })}
              </table>
              <br />
            </div>
          </div>
        )}
        {error && (
          <div>
            <br />
            <div className="text-danger">
              アクセス結果の取得に失敗しました。
            </div>
          </div>
        )}
      </div>
    </>
  );
}
