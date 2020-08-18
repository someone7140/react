const localStorageKey = "covit19SearchConditionStoreKey";

// 検索条件をリストに追加
export function addSearchConditionData(input, setSearchConditionListState) {
  const d = new Date();
  // 検索条件のキー生成
  const searchConditionKey =
    d.getFullYear().toString() +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    d.getDate().toString().padStart(2, "0") +
    d.getHours().toString().padStart(2, "0") +
    d.getMinutes().toString().padStart(2, "0") +
    d.getSeconds().toString().padStart(2, "0");
  // 新規追加した検索条件を選択状態にして保存
  const addCondition = { ...input, key: searchConditionKey, selected: true };
  const storeSearchConditions = [
    addCondition,
    ...getSearchConditionsFromLocalStorage().map((s) => {
      return { ...s, selected: false };
    }),
  ];
  // 保存
  localStorage.setItem(localStorageKey, JSON.stringify(storeSearchConditions));
  setSearchConditionListState(storeSearchConditions);
}

export function updateSelected(selectKey, setSearchConditionListState) {
  const updatedList = getSearchConditionsFromLocalStorage().map((s) => {
    if (s.key === selectKey) {
      return { ...s, selected: true };
    } else {
      return { ...s, selected: false };
    }
  });
  setSearchConditionListState(updatedList);
  localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
}

export function readLocalStrageAndSetState(
  setSearchConditionState,
  setSearchConditionListState
) {
  const searchConditions = getSearchConditionsFromLocalStorage();
  const searchCondition = searchConditions.find((s) => {
    return s.selected;
  });
  if (searchCondition) {
    setSearchConditionState(searchCondition);
  }
  setSearchConditionListState(searchConditions);
}

export function deleteSearchConditionFromLocalStorage(
  deleteKey,
  setSearchConditionListState
) {
  const updatedList = getSearchConditionsFromLocalStorage()
    .filter((s) => {
      return s.key !== deleteKey;
    })
    .map((s, i) => {
      if (i === 0) {
        return { ...s, selected: true };
      } else {
        return s;
      }
    });
  setSearchConditionListState(updatedList);
  localStorage.setItem(localStorageKey, JSON.stringify(updatedList));
}

export function resetConditionState(condition, setSearchConditionState) {
  setSearchConditionState({
    ...condition,
    graphDisplayFlg: true,
  });
}

function getSearchConditionsFromLocalStorage() {
  const items = localStorage.getItem(localStorageKey);
  if (items) {
    const parseItems = JSON.parse(items);
    return parseItems.map((i) => {
      if (i.selectRange === "directInput") {
        return {
          ...i,
          startDate: new Date(i.startDate),
          endDate: new Date(i.endDate),
        };
      } else {
        return {
          ...i,
          startDate: new Date(i.startDate),
          endDate: new Date(i.endDate),
        };
      }
    });
  } else {
    return [];
  }
}
