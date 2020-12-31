import { getClient } from "./CommonApiService";

// 直近のフィッシュサイト取得
export async function getRecentPhishSite(
  limitCount,
  setErrorFlg,
  setPhishSiteList,
  setSearchCount
) {
  try {
    const result = await getClient().get(
      `${process.env.API_DOMAIN}/recent_phish_site?limit=${limitCount}`
    );
    if (result.status === 200) {
      setErrorFlg(false);
      setPhishSiteList(result.data);
      setSearchCount(result.data.length);
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}

// URLを指定したフィッシュサイト取得
export async function getSearchPhishSite(
  inputUrl,
  setErrorFlg,
  setPhishSiteList,
  setSearchCount
) {
  try {
    const result = await getClient().post(
      `${process.env.API_DOMAIN}/search_phish_site`,
      {
        url: inputUrl,
      }
    );
    if (result.status === 200) {
      setErrorFlg(false);
      setPhishSiteList(result.data);
      setSearchCount(result.data.length);
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}
