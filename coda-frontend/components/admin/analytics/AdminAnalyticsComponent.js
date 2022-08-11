import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import AccessAnalyticsComponent from "./AccessAnalyticsComponent";
import CoordinatePostAnalyticsComponent from "./CoordinatePostAnalyticsComponent";

export default function AdminAnalyticsComponent() {
  const [tabKey, setTabKey] = useState("access");

  function onChangeTab(k) {
    setTabKey(k);
  }

  return (
    <>
      <div
        className="fixed-top"
        style={{ margin: "60px 0 0 auto", background: "white", height: "10px" }}
      ></div>
      <Tabs
        id="analytics-tab"
        activeKey={tabKey}
        onSelect={(k) => onChangeTab(k)}
        className="fixed-top"
        style={{ margin: "70px 0 0 auto", background: "white" }}
      >
        <Tab eventKey="access" title="アクセス分析">
          {tabKey === "access" && (
            <>
              <div style={{ height: "55px" }}> </div>
              <AccessAnalyticsComponent />
            </>
          )}
        </Tab>
        <Tab eventKey="coordinate" title="コーデ投稿分析">
          {tabKey === "coordinate" && (
            <>
              <div style={{ height: "55px" }}> </div>
              <CoordinatePostAnalyticsComponent />
            </>
          )}
        </Tab>
      </Tabs>
    </>
  );
}
