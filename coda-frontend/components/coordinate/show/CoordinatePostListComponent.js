import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroller";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { updateImpressionCountToCoordinatePost } from "../../../services/api/ApiCoordinateService";
import CoordinatePostComponent from "./CoordinatePostComponent";

export default function CoordinatePostListComponent(prop) {
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
  }, [prop.coordinatePosts]);

  function updateDisplayPosts(addPosts) {
    if (addPosts.length > 0) {
      setDisplayPosts(displayPosts.concat(addPosts));

      if (user.loginUser?.user_type !== "admin") {
        // インプレッションカウント
        updateImpressionCountToCoordinatePost(addPosts.map((p) => p._id));
      }
    }
  }

  useEffect(() => {
    if (prop.coordinatePosts && prop.coordinatePosts.length > 0) {
      if (displayPosts.length == 0) {
        updateDisplayPosts(prop.coordinatePosts.slice(0, 10));
      }
    }
  }, [displayPosts]);

  const loadMore = async (page) => {
    const nowDisplayIndex = displayPosts.length;
    const newDisplayLength = displayPosts.length + 10;
    if (
      prop.coordinatePosts &&
      prop.coordinatePosts.length > 0 &&
      displayPosts.length > 0 &&
      prop.coordinatePosts.length > displayPosts.length
    ) {
      updateDisplayPosts(
        prop.coordinatePosts.slice(nowDisplayIndex, newDisplayLength)
      );
    }
  };
  return (
    <div style={{ maxWidth: "500px" }}>
      {prop.coordinatePosts && prop.coordinatePosts.length > 0 && master && (
        <div>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={displayPosts.length < prop.coordinatePosts.length}
            loader={loader}
          >
            {displayPosts.map((p) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <CoordinatePostComponent
                    id={p._id}
                    coordinatePost={p}
                    adminFlag={prop.adminFlag}
                    setRefetchTime={prop.setRefetchTime}
                    imageCacheNoUse={prop.adminFlag}
                    setModalFlag={prop.setModalFlag}
                    shops={prop.shops}
                  />
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {(!prop.coordinatePosts || prop?.coordinatePosts.length == 0) && (
        <div style={{ paddingTop: "40px" }}>取得できた投稿はありません</div>
      )}
    </div>
  );
}
