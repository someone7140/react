import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import SearchInputComponent from "./search/SearchInputComponent";
import SearchConditionSelectComponent from "./search/SearchConditionSelectComponent";
import GraphTabsComponent from "./graph/GraphTabsComponent";
import { searchConditionState } from "../atoms/SearchCondition";
import { searchConditionSelectState } from "../atoms/SearchConditionSelectList";
import { readLocalStrageAndSetState } from "../service/StorageService";

export default function MainComponent() {
  const [searchCondition, setSearchConditionState] = useRecoilState(
    searchConditionState
  );
  const [searchConditionSelect, setSearchConditionSelectState] = useRecoilState(
    searchConditionSelectState
  );
  const [displayGraph, setDisplayGraph] = useState(false);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      readLocalStrageAndSetState(
        setSearchConditionState,
        setSearchConditionSelectState
      );
      setDisplayGraph(false);
      setDisplayGraph(true);
    } else {
      setDisplayGraph(false);
      setDisplayGraph(true);
    }
    mounted.current = true;
  }, [
    searchCondition,
    setSearchConditionState,
    searchConditionSelect,
    setSearchConditionSelectState,
  ]);

  return (
    <div>
      <h2>国内コロナ分析</h2>
      {searchConditionSelect.length > 0 && (
        <div>
          <SearchConditionSelectComponent />
          <br />
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>検索条件の入力</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <SearchInputComponent />
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      {searchConditionSelect.length === 0 && <SearchInputComponent />}
      {searchCondition && (
        <div>
          <br />
          <GraphTabsComponent displayGraph={displayGraph} />
        </div>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}
