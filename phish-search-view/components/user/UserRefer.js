import { useEffect, useState } from "react";
import { getPostListByUserId } from "../../services/api/ApiPostService";
import { getUserInfoByUserId } from "../../services/api/ApiUserService";
import { getDisplayDate } from "../../services/common/DateService";

export default function UserRefer(prop) {
  const [user, setUser] = useState(undefined);
  const [userError, setUserError] = useState(undefined);
  const [postList, setPostList] = useState(undefined);
  const [postListError, setPostListError] = useState(undefined);

  const tableStyle = {
    width: "95%",
    tableLayout: "fixed",
  };

  const tdStyle = {
    wordBreak: "break-all",
  };

  useEffect(() => {
    getUserInfoByUserId(prop.userId, setUserError, setUser);
    getPostListByUserId(prop.userId, setPostListError, setPostList);
  }, [prop]);

  return (
    <div className="text-center">
      {user && !userError && (
        <table border="1" align="center" style={tableStyle}>
          <tr bgcolor="aqua">
            <td>ユーザ名</td>
          </tr>
          <tr>
            <td>{user.name}</td>
          </tr>
        </table>
      )}
      <br />
      <br />
      <h3>【投稿一覧】</h3>
      {!postListError && postList && postList.length > 0 && (
        <table style={tableStyle} align="center" border="1">
          <tr bgcolor="aqua">
            <td width="40%">URL</td>
            <td width="45%">投稿内容</td>
            <td width="10%">登録日</td>
          </tr>
          {postList.map((p) => (
            <tr>
              <td width="40%" style={tdStyle}>
                {p.url}
              </td>
              <td width="45%" style={tdStyle}>
                {p.postContents}
              </td>
              <td width="10%" style={tdStyle}>
                {getDisplayDate(p.postRegisterAt)}
              </td>
            </tr>
          ))}
        </table>
      )}
      {!postListError && postList && postList.length == 0 && (
        <div>投稿はありません</div>
      )}
    </div>
  );
}
