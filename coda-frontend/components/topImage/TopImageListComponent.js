import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import TopImageComponent from "./TopImageComponent";

export default function TopImageListComponent(prop) {
  const [displayImages, setDisplayImages] = useState([]);
  const topImages = prop.topImages;

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  const loadMore = async (page) => {
    const nowDisplayIndex = displayImages.length;
    const newDisplayLength =
      displayImages.length + 12 > topImages
        ? topImages.length
        : displayImages.length + 12;

    const addImages = topImages.slice(nowDisplayIndex, newDisplayLength);
    setDisplayImages(displayImages.concat(addImages));
  };

  return (
    <>
      {topImages && topImages.length > 0 && (
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={displayImages.length < topImages.length}
          loader={loader}
        >
          <div
            className="ml-2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              flexDirection: "row",
              gap: "0% 1%",
              paddingBottom: "100%",
              position: "relative",
              alignItems: "top",
              justifyContent: "center",
            }}
          >
            {displayImages.map((displayImage) => {
              return (
                <div
                  style={{
                    width: "32%",
                  }}
                >
                  <TopImageComponent
                    id={displayImage._id}
                    displayImage={displayImage}
                    shops={prop.shops}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
