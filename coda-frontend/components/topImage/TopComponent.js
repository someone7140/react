import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Tab, Tabs } from "react-bootstrap";

import { loginUserState } from "../../atoms/LoginUser";
import LineAccountLink from "../common/LineAccountLink";
import TopImageListComponent from "./TopImageListComponent";
import { getTopRecentImages } from "../../services/api/ApiTopImageService";
import { getShopList } from "../../services/api/ApiShopService";

export default function TopComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topImages, setTopImages] = useState(undefined);
  const [shops, setShops] = useState(undefined);
  const [shopError, setShopError] = useState(false);
  const [shopLoading, setShopLoading] = useState(true);
  const [tabKey, setTabKey] = useState("recent");

  useEffect(() => {
    getTopRecentImages(setError, setTopImages, setLoading, user);
    getShopList(setShopError, setShops, setShopLoading);
  }, []);

  function onChangeTab(k) {
    setTabKey(k);
  }

  return (
    <>
      <div className="text-center">
        <span style={{ whiteSpace: "nowrap" }}>
          CODAでは、世界中のファッションブランドの <br />
          商品を購入できます。
          <br /> <br />
          商品の購入やお見積もりは、 <br />
          商品ページの「購入申請」をクリック後に
          <br />
          <LineAccountLink />
          でお問い合わせ下さい。
        </span>
      </div>
      <div style={{ marginTop: "30px", maxWidth: "500px" }}>
        {!error && !loading && !shopLoading && !shopError && (
          <>
            {topImages.sale_only_posts?.length > 0 && (
              <Tabs
                id="controlled-tab-top"
                activeKey={tabKey}
                onSelect={(k) => onChangeTab(k)}
                style={{ margin: "10px 0 0 auto", background: "white" }}
              >
                <Tab eventKey="recent" title="最新投稿">
                  {tabKey === "recent" && (
                    <div style={{ margin: "30px 0 0 auto" }}>
                      <TopImageListComponent
                        topImages={topImages.recent_posts}
                        shops={shops}
                      />
                    </div>
                  )}
                </Tab>
                <Tab eventKey="sale" title="セール情報">
                  {tabKey === "sale" && (
                    <div style={{ margin: "30px 0 0 auto" }}>
                      <TopImageListComponent
                        topImages={topImages.sale_only_posts}
                        shops={shops}
                      />
                    </div>
                  )}
                </Tab>
              </Tabs>
            )}
            {!(topImages.sale_only_posts?.length > 0) && (
              <div style={{ margin: "50px 0 0 auto" }}>
                <TopImageListComponent
                  topImages={topImages.recent_posts}
                  shops={shops}
                />
              </div>
            )}
          </>
        )}
        {(loading || shopLoading) && (
          <div>
            <img src="/loading.gif" />
          </div>
        )}
      </div>
    </>
  );
}
