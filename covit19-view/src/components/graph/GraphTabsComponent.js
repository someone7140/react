import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useRecoilValue } from "recoil";
import { searchConditionState } from "../../atoms/SearchCondition";
import { PREFECTURE_LIST } from "../../constants/Covit19Constants";
import GraphListComponent from "./GraphListComponent";

export default function GraphTabsComponent(props) {
  const [prefectureTabs, setPrefectureTabs] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const searchCondition = useRecoilValue(searchConditionState);

  useEffect(() => {
    const selectedPrefectures = PREFECTURE_LIST.filter((p) => {
      return (
        searchCondition.prefectures &&
        searchCondition.prefectures.includes(p.value)
      );
    });
    setPrefectureTabs([
      { value: "all", label: "国内合計" },
      ...selectedPrefectures,
    ]);
    setSelectedTabIndex(0);
  }, [searchCondition]);

  function changeSelectedTabIndex(i) {
    setSelectedTabIndex(i);
  }
  return (
    <div>
      <Tabs selectedIndex={selectedTabIndex} onSelect={changeSelectedTabIndex}>
        <TabList>
          {prefectureTabs.map((p) => {
            return <Tab key={p.value}>{p.label}</Tab>;
          })}
        </TabList>
        {prefectureTabs.map((p) => {
          return (
            <TabPanel key={p.value}>
              <GraphListComponent
                prefectureCode={p.value}
                displayGraph={props.displayGraph}
              />
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
}
