import { useEffect, useState } from "react";
import { getPostByPostId } from "../../services/api/ApiPostService";
import { getDisplayDate } from "../../services/common/DateService";

export default function PostRefer(prop) {
  const [post, setPost] = useState(undefined);
  const [error, setError] = useState(false);

  const tableStyle = {
    width: "95%",
    tableLayout: "fixed",
  };

  useEffect(() => {
    getPostByPostId(prop.postId, setError, setPost);
  }, [prop]);

  return (
    <div className="text-center">
      {post && !error && (
        <table border="1" align="center" style={tableStyle}>
          <tr bgcolor="aqua">
            <td>投稿者</td>
          </tr>
          <tr>
            <td>
              <a href={"/user/" + post.userId}>{post.userName}</a>
            </td>
          </tr>
          <tr bgcolor="aqua">
            <td>投稿URL</td>
          </tr>
          <tr>
            <td>{post.url}</td>
          </tr>
          <tr bgcolor="aqua">
            <td>投稿内容</td>
          </tr>
          <tr>
            <td>{post.postContents}</td>
          </tr>
          <tr bgcolor="aqua">
            <td>投稿日</td>
          </tr>
          <tr>
            <td>{getDisplayDate(post.postRegisterAt)}</td>
          </tr>
        </table>
      )}
      {error && <div>対象の投稿を取得できませんでした</div>}
    </div>
  );
}
