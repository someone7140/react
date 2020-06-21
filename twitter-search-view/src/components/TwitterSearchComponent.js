import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import TwitterLinkInfosComponent from "./link/TwitterLinkInfosComponent";
import TwitterSearchConditionComponent from "./searchConditions/TwitterSearchConditionComponent";
import { readlocalStrageAndSetStorage } from "../service/LocalStorageService";
import { TwitterSearchStore } from "../store/TwitterSearchStore";

export default function TwitterSearchComponent() {
  const { state, dispatch } = useContext(TwitterSearchStore);
  function resetStoreFlg(dispatch) {
    dispatch({
      type: "MAKE_LINK",
      errorFlg: false,
      localStorageReadFlg: false,
    });
  }

  useEffect(() => {
    if (state.errorFlg) {
      toast("リンクの生成に失敗しました。再度お試しください。");
      resetStoreFlg(dispatch);
    } else {
      // localStorageからリンクを読み込み
      if (state.localStorageReadFlg) {
        readlocalStrageAndSetStorage(dispatch);
        resetStoreFlg(dispatch);
      }
    }
  }, [state, dispatch]);

  return (
    <div>
      <TwitterSearchConditionComponent />
      <br />
      <br />
      {state.twitterLinkInfos && state.twitterLinkInfos.length > 0 && <TwitterLinkInfosComponent />}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
