import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchConditionState } from "../../atoms/SearchCondition";
import {
  setPrefectureDataFromApi,
  setSummaryDataFromApi,
} from "../../service/ApiService";
import {
  getDisplayPopulation,
  getPercentage,
} from "../../service/GraphDisplayService";
import CaseGraphComponent from "./CaseGraphComponent";
import PcrGraphComponent from "./PcrGraphComponent";
import TreatmentGraphComponent from "./TreatmentGraphComponent";

export default function GraphListComponent(props) {
  const [apiResult, setApiResult] = useState(undefined);
  const searchCondition = useRecoilValue(searchConditionState);

  useEffect(() => {
    if (props.displayGraph) {
      if (props.prefectureCode === "all") {
        setSummaryDataFromApi(searchCondition, setApiResult);
      } else {
        setPrefectureDataFromApi(
          searchCondition,
          props.prefectureCode,
          setApiResult
        );
      }
    }
  }, [props, searchCondition]);

  return (
    <div>
      {apiResult &&
        apiResult.success &&
        apiResult.data.case_cumulative_list.length > 0 && (
          <div>
            &nbsp;&nbsp;※
            <a
              href="https://github.com/ryo-ma/covid19-japan-web-api"
              target="_blank"
              rel="noopener noreferrer"
            >
              COVID-19 Japan Web API
            </a>
            のデータを使用しています。
            <br />
            <br />
            【人口】
            {getDisplayPopulation(
              apiResult.data.case_cumulative_list.slice(-1)[0].population
            )}
            万人
            <br />
            <br />
            <div>
              【前日付からの推移】
              <br />
              ＜感染状況の推移＞
              <br />
              <CaseGraphComponent
                caseData={apiResult.data.case_transition_list}
              />
              <br />
              ＜PCR検査の推移＞
              <br />
              <PcrGraphComponent
                pcrData={apiResult.data.case_transition_list.map((p) => {
                  return {
                    pcr: p.pcr,
                    casePercentage: getPercentage(p.cases, p.pcr),
                    daily_date: p.daily_date,
                  };
                })}
              />
              <br />
            </div>
            <br />
            <div>
              【治療状況】
              <br />
              <TreatmentGraphComponent
                treatmentData={apiResult.data.treatment_list}
              />
            </div>
            <br />
            <div>
              【累計】
              <br />
              ＜感染者の累計＞
              <br />
              <CaseGraphComponent
                caseData={apiResult.data.case_cumulative_list}
              />
              <br />
              ＜PCR検査の累計＞
              <br />
              <PcrGraphComponent
                pcrData={apiResult.data.case_cumulative_list.map((p) => {
                  return {
                    pcr: p.pcr,
                    casePercentage: getPercentage(p.cases, p.pcr),
                    daily_date: p.daily_date,
                  };
                })}
              />
              <br />
            </div>
          </div>
        )}
      {apiResult && !apiResult.success && <div>データの取得に失敗しました</div>}
      {apiResult &&
        apiResult.success &&
        apiResult.data.case_cumulative_list.length === 0 && (
          <div>データがありません</div>
        )}
      {!apiResult && (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/loading.gif`}
            alt="ローディング中・・"
          />
        </div>
      )}
    </div>
  );
}
