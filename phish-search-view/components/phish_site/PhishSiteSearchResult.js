import { useEffect, useState } from "react";
import {
  getRecentPhishSite,
  getSearchPhishSite,
} from "../../services/api/ApiPhishSiteService";
import { getDisplayDate } from "../../services/common/DateService";

const tableStyle = {
  width: "95%",
  tableLayout: "fixed",
};

const tdStyle = {
  wordBreak: "break-all",
};

export default function PhishSiteSearchResult(prop) {
  const [phsihSiteList, setPhishSiteList] = useState(undefined);
  const [errorFlg, setErrorFlg] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [searched, setSearched] = useState(undefined);
  const [inputUrl, setInputUrl] = useState(undefined);
  const recentDays = 30;

  useEffect(() => {
    if (searched === undefined || searched !== prop.searched) {
      setSearched(prop.searched);
      if (!prop.searched) {
        getRecentPhishSite(
          recentDays,
          setErrorFlg,
          setPhishSiteList,
          setSearchCount
        );
      }

      if (prop.searched) {
        getSearchPhishSite(
          prop.inputUrl,
          setErrorFlg,
          setPhishSiteList,
          setSearchCount
        );
      }
    } else if (prop.searched && inputUrl !== prop.inputUrl) {
      if (prop.searched) {
        getSearchPhishSite(
          prop.inputUrl,
          setErrorFlg,
          setPhishSiteList,
          setSearchCount
        );
      }
    }
  }, [prop]);

  return (
    <div>
      {!prop.searched && (
        <div>直近更新されたフィッシュサイト{searchCount}件を表示</div>
      )}
      {prop.searched && (
        <div>
          検索URL「{prop.inputUrl}」の結果{searchCount}件
        </div>
      )}
      <br />
      {errorFlg && <span>エラーが発生しました。</span>}
      {phsihSiteList && phsihSiteList.length == 0 && (
        <span>検索結果はありませんでした。</span>
      )}
      {phsihSiteList && phsihSiteList.length > 0 && (
        <table style={tableStyle} align="center" border="1">
          <tr bgcolor="aqua">
            <td width="50%">URL</td>
            <td width="20%">PhishTank参照</td>
            <td width="15%">投稿者参照</td>
            <td width="10%">URL登録日</td>
          </tr>
          {phsihSiteList.map((p) => (
            <tr>
              <td width="50%" style={tdStyle}>
                {p.phishUrl}
              </td>
              <td width="20%" style={tdStyle}>
                {p.phishTankId && p.phishTankUrl && (
                  <a href={p.phishTankUrl} target="_blank">
                    {p.phishTankId}
                  </a>
                )}
              </td>
              <td width="15%" style={tdStyle}>
                {p.postInfos &&
                  p.postInfos.length > 0 &&
                  p.postInfos.map((post) => (
                    <div>
                      <a href={"/post/" + post.postId} target="_blank">
                        {post.userName}
                      </a>
                    </div>
                  ))}
              </td>
              <td width="10%" style={tdStyle}>
                {getDisplayDate(p.registerAt)}
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
