"use client";

import { FC, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// テスト用に配列を生成する関数
const makeTestArray = (begin: number, end: number) => {
  return [...Array(end - begin)].map((_, i) => begin + i);
};

export const SampleReactVirtualComponent: FC = () => {
  const [sampleRows, setSampleRows] = useState<number[]>(makeTestArray(1, 101));
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: sampleRows.length + 1, // 最後のアイテムは空にしてfetchの判定に使用
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // 要素の高さ
    overscan: 10, // 先読みしておくアイテム数
  });

  useEffect(() => {
    // 行を追加する関数
    const fetchRow = async () => {
      setIsFetching(true);

      // テスト用にスリープ
      const my_sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await my_sleep(3000);
      // 行の追加処理
      const lastNumber = sampleRows[sampleRows.length - 1];
      setSampleRows([
        ...sampleRows,
        ...makeTestArray(lastNumber + 1, lastNumber + 101),
      ]);

      setIsFetching(false);
    };

    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= sampleRows.length && !isFetching) {
      fetchRow();
    }
  }, [isFetching, rowVirtualizer.getVirtualItems(), sampleRows]);

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `500px`,
          overflow: "auto",
          width: "200px",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const numberRow = sampleRows[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 15,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {numberRow && <>{numberRow}行目</>}
                {!numberRow && <>読み込み中・・</>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
