const localStorageKeySuffix = "_twitterLinkKey";

export function storeTwitterLinkData(input, link) {
  const storeObjectJson = JSON.stringify({
    input: input,
    link: link,
  });
  const d = new Date();
  // キーの生成
  const storeKey =
    d.getFullYear().toString() +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    d.getDate().toString().padStart(2, "0") +
    d.getHours().toString().padStart(2, "0") +
    d.getMinutes().toString().padStart(2, "0") +
    d.getSeconds().toString().padStart(2, "0") +
    localStorageKeySuffix;
  // 保存
  localStorage.setItem(storeKey, storeObjectJson);
}

export function updateTwitterLinkData(input, link, key) {
  const storeObjectJson = JSON.stringify({
    input: input,
    link: link,
  });
  localStorage.setItem(key, storeObjectJson);
}

export function readlocalStrageAndSetStorage(dispatch) {
  dispatch({
    type: "UPDATE_LINK_INFOS",
    twitterLinkInfos: getTwitterLinkInfosFromLocalStorage(),
  });
}

export function deleteLinkFromLocalStorage(dispatch, localStorageKey) {
  localStorage.removeItem(localStorageKey);
  dispatch({
    type: "UPDATE_LINK_INFOS",
    twitterLinkInfos: getTwitterLinkInfosFromLocalStorage(),
  });
}

function getTwitterLinkInfosFromLocalStorage() {
  var twitterLinkInfos = [];
  for (var i = 0; i < localStorage.length; i++) {
    const localStorageKey = localStorage.key(i);
    if (localStorageKey.endsWith(localStorageKeySuffix)) {
      const linkInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));

      twitterLinkInfos.push({
        key: localStorageKey,
        linkInfo: {
          link: linkInfo.link,
          input: {
            ...linkInfo.input,
            startDate: linkInfo.input.startDate ? new Date(linkInfo.input.startDate) : undefined,
            endDate: linkInfo.input.endDate ? new Date(linkInfo.input.endDate) : undefined,
          },
        },
      });
    }
  }
  return twitterLinkInfos;
}
