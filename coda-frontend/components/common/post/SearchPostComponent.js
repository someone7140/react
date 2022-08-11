import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import CoordinateTopComponent from "../../coordinate/CoordinateTopComponent";
import ItemPostListTopComponent from "../../itemPost/ItemPostListTopComponent";

export default function TopPostComponent() {
  const [tabKey, setTabKey] = useState("coordinate");
  const [refetchTimeItemPost, setRefetchTimeItemPost] = useState(0);

  function onChangeTab(k) {
    // はじめてアイテム投稿にアクセス
    if (k == "item" && refetchTimeItemPost == undefined) {
      setRefetchTimeItemPost(0);
    }
    setTabKey(k);
  }

  return (
    <>
      <div
        className="fixed-top"
        style={{ margin: "60px 0 0 auto", background: "white", height: "10px" }}
      ></div>
      <Tabs
        id="controlled-tab-search-post"
        activeKey={tabKey}
        onSelect={(k) => onChangeTab(k)}
        className="fixed-top"
        style={{ margin: "70px 0 0 auto", background: "white" }}
      >
        <Tab eventKey="coordinate" title="ショップ情報">
          {tabKey === "coordinate" && (
            <div style={{ margin: "50px 0 0 auto" }}>
              <CoordinateTopComponent />
            </div>
          )}
        </Tab>
        <Tab eventKey="item" title="ユーザ投稿">
          {refetchTimeItemPost != undefined && (
            <div style={{ margin: "50px 0 0 auto" }}>
              <ItemPostListTopComponent />
            </div>
          )}
        </Tab>
        {/*<Tab eventKey="instagram" title="インスタ投稿">
          <InstagramTopPostComponent />
        </Tab>*/}
      </Tabs>
    </>
  );
}
