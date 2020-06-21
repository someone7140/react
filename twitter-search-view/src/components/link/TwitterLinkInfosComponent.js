import React, { useContext } from "react";
import TwitterSearchConditionComponent from "../searchConditions/TwitterSearchConditionComponent";
import { deleteLinkFromLocalStorage } from "../../service/LocalStorageService";
import { TwitterSearchStore } from "../../store/TwitterSearchStore";

export default function TwitterLinkInfosComponent() {
  const { state, dispatch } = useContext(TwitterSearchStore);

  function deleteLink(twitterLinkInfo) {
    const ret = window.confirm("リンクを削除します。よろしいですか？");
    if (ret) {
      deleteLinkFromLocalStorage(dispatch, twitterLinkInfo.key);
    }
  }

  return (
    <div>
      <table>
        <tbody>
          {state.twitterLinkInfos.map((t) => {
            return (
              <tr key={t.key}>
                <td>
                  <a
                    href={t.linkInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.linkInfo.input.linkName}
                  </a>
                </td>
                <td>
                  <TwitterSearchConditionComponent selectedCondition={t} />
                </td>
                <td>
                  <button onClick={() => deleteLink(t)}>
                    リンクを削除する
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
