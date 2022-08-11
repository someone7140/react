import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroller";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { updateImpressionCountToItemPosts } from "../../../services/api/ApiItemPostService";
import CommonItemPostComponent from "./CommonItemPostComponent";

export default function CommonItemPostListComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [displayPosts, setDisplayPosts] = useState([]);

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  useEffect(() => {
    setDisplayPosts([]);
  }, [prop.itemPosts]);

  function updateDisplayPosts(addPosts) {
    if (addPosts.length > 0) {
      setDisplayPosts(displayPosts.concat(addPosts));

      // インプレッションカウント
      const impressionTargetItemPostIds = addPosts
        .filter((p) => p.user_id != user?.loginUser?._id)
        .map((p) => p._id);
      if (
        impressionTargetItemPostIds &&
        impressionTargetItemPostIds.length > 0
      ) {
        updateImpressionCountToItemPosts(impressionTargetItemPostIds);
      }
    }
  }

  useEffect(() => {
    if (prop.itemPosts && prop.itemPosts.length > 0) {
      if (displayPosts.length == 0) {
        updateDisplayPosts(prop.itemPosts.slice(0, 10));
      }
    }
  }, [displayPosts]);

  const loadMore = async (page) => {
    const nowDisplayIndex = displayPosts.length;
    const newDisplayLength = displayPosts.length + 10;
    if (
      prop.itemPosts &&
      prop.itemPosts.length > 0 &&
      displayPosts.length > 0 &&
      prop.itemPosts.length > displayPosts.length
    ) {
      updateDisplayPosts(
        prop.itemPosts.slice(nowDisplayIndex, newDisplayLength)
      );
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      {prop.itemPosts && prop.itemPosts.length > 0 && master && (
        <div>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={displayPosts.length < prop.itemPosts.length}
            loader={loader}
          >
            {displayPosts.map((p) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <CommonItemPostComponent
                    id={p._id}
                    postInfo={p}
                    managementDisplayFlag={prop.managementDisplayFlag}
                    setRefetchTime={prop.setRefetchTime}
                    imageCacheNoUse={prop.imageCacheNoUse}
                  />
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {(!prop.itemPosts || prop.itemPosts.length == 0) && (
        <div>取得できた投稿はありません</div>
      )}
    </div>
  );
}
