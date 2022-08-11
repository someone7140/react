import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroller";

import ShopShowComponent from "../../../common/shop/ShopShowComponent";
import { masterState } from "../../../../atoms/Master";

export default function ShopListComponent(prop) {
  const [master, setMaster] = useRecoilState(masterState);
  const [displayShops, setDisplayShops] = useState([]);

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  useEffect(() => {
    setDisplayShops([]);
    if (prop.shops && prop.shops.length > 0) {
      if (displayShops.length == 0) {
        updateDisplayShops(prop.shops.slice(0, 10));
      }
    }
  }, [prop.shops]);

  function updateDisplayShops(addShops) {
    if (addShops.length > 0) {
      setDisplayShops(displayShops.concat(addShops));
    }
  }

  const loadMore = async (page) => {
    const nowDisplayIndex = displayShops.length;
    const newDisplayLength = displayShops.length + 10;
    if (
      prop.shops &&
      prop.shops.length > 0 &&
      displayShops.length > 0 &&
      prop.shops.length > displayShops.length
    ) {
      updateDisplayShops(prop.shops.slice(nowDisplayIndex, newDisplayLength));
    }
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      {prop.shops && prop.shops.length > 0 && master && (
        <div>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={displayShops.length < prop.shops.length}
            loader={loader}
          >
            {displayShops.map((s) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <ShopShowComponent
                    id={s._id}
                    shopInfo={s}
                    setModalFlag={prop.setModalFlag}
                    setRefetchTime={prop.setRefetchTime}
                    adminFlag={true}
                  />
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {(!prop.shops || prop.shops.length == 0) && (
        <div>取得できたショップはありません</div>
      )}
    </div>
  );
}
