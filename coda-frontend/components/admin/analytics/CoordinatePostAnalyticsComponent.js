import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../../atoms/LoginUser";
import { getCoordinatePostAnalytics } from "../../../services/api/ApiAnalyticsService";
import { getDateStrForItemPostDisplay } from "../../../services/common/DateService";
import { getCoordinateUrl } from "../../../services/common/PostService.js";

export default function CoordinatePostAnalyticsComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [coordinatePostAnalyticsData, setCoordinatePostAnalyticsData] =
    useState([]);
  const [analysiSpan, setAnalysiSpan] = useState("three_month");
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const detailThStyle = {
    backgroundColor: "gainsboro",
  };

  const columns = useMemo(
    () => [
      {
        Header: "商品",
        accessor: "item",
        disableSortBy: true,
      },
      {
        Header: "ショップ",
        accessor: "shop",
        disableSortBy: true,
      },
      {
        Header: "投稿日",
        accessor: "postDate",
        disableSortBy: true,
      },
      {
        Header: (
          <span style={{ color: "deepskyblue" }} role="button">
            インプレッション数
          </span>
        ),
        accessor: "impCount",
        sortType: "number",
      },
      {
        Header: (
          <span style={{ color: "deepskyblue" }} role="button">
            クリック数
          </span>
        ),
        accessor: "clckCount",
        sortType: "number",
      },
      {
        Header: (
          <span style={{ color: "deepskyblue" }} role="button">
            購入申請数
          </span>
        ),
        accessor: "purchaseRequestCount",
        sortType: "number",
      },
    ],
    []
  );

  function getCoodinateDataFromApi(span) {
    getCoordinatePostAnalytics(
      setAnalysisDataWithConvert,
      setError,
      user,
      setLoading,
      span
    );
  }

  function setAnalysisDataWithConvert(resultData) {
    setCoordinatePostAnalyticsData(
      resultData.map((c) => {
        return {
          item: (
            <a href={getCoordinateUrl(c._id)} target="_blank">
              {c.title}
            </a>
          ),
          shop: (
            <a
              href={
                "/coordinate/coordinateList?shopSettingId=" + c.shop_setting_id
              }
              target="_blank"
            >
              {c.shop_name}
            </a>
          ),
          postDate: getDateStrForItemPostDisplay(c.post_date),
          impCount: c.impression_count,
          clckCount: c.click_count,
          purchaseRequestCount: c.purchase_request_count,
        };
      })
    );
  }

  useEffect(() => {
    getCoodinateDataFromApi(analysiSpan);
  }, []);

  function analysiSpanChange(e) {
    const span = e.target.value;
    getCoodinateDataFromApi(span);
    setAnalysiSpan(span);
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data: coordinatePostAnalyticsData,
        columns: columns,
        initialState: {
          sortBy: [{ id: "purchaseRequestCount", desc: true }],
        },
      },
      useSortBy
    );

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  return (
    <>
      <div>
        {loading && loader}
        {!loading && coordinatePostAnalyticsData && (
          <div>
            <div style={{ paddingLeft: "250px" }}>
              <select
                id="analysiSpan"
                value={analysiSpan}
                onChange={analysiSpanChange}
              >
                <option value="all">全期間</option>
                <option value="three_month">直近3ヶ月の投稿</option>
                <option value="one_month">直近1ヶ月の投稿</option>
              </select>
            </div>
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <table {...getTableProps()} border="1">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          style={detailThStyle}
                        >
                          {column.render("Header")}
                          {column.canSort &&
                            (() => {
                              return (
                                <div>
                                  {column.isSorted
                                    ? column.isSortedDesc
                                      ? "🔽"
                                      : "🔼"
                                    : ""}
                                </div>
                              );
                            })()}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <br />
            </div>
          </div>
        )}
        {error && (
          <div>
            <br />
            <div className="text-danger">
              コーデ投稿分析結果の取得に失敗しました。
            </div>
          </div>
        )}
      </div>
    </>
  );
}
