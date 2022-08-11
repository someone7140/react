// カテゴリーのキーから文字列に変換
export function getCategryStrFromKey(master, key) {
  if (master && key) {
    return key
      .split("-")
      .map((k, i) => {
        if (i == 0) {
          return master?.gender?.find((g) => g.value == k)?.label;
        } else if (i == 1) {
          return master?.silhouette?.find((s) => s.value == k)?.label;
        } else if (i == 2) {
          return master?.height?.find((h) => h.value == k)?.label;
        } else {
          return master?.genre?.find((g) => g.value == k)?.label;
        }
      })
      .filter((k) => k)
      .join("-");
  } else {
    return "";
  }
}

// カテゴリーのキーを分解してオブジェクトとして取得
export function separateCategoryKey(category) {
  const categorySplitArr = category.split("-");
  return {
    gender: categorySplitArr[0],
    silhouette: categorySplitArr[1],
    height: categorySplitArr[2],
    genre: categorySplitArr[3],
  };
}
