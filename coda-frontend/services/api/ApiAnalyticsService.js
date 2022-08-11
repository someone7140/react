import axios from "axios";

// アクセスの分析情報を取得するAPI
export async function getAccessAnalytics(
  setAccessAnalyticsData,
  setError,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getAccessAnalysis`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setAccessAnalyticsData(result.data);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// コーデの分析情報を取得するAPI
export async function getCoordinatePostAnalytics(
  setResponseData,
  setError,
  user,
  setLoading,
  analysiSpan
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getCoordinatePostAnalysis?analysis_span=${analysiSpan}`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setResponseData(result.data);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// いいねの分析情報を取得するAPI
export async function getFavoriteAnalytics(
  setPosts,
  setError,
  user,
  setLoading,
  sort
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getFavoriteAnalysis?sort=${sort}`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setPosts(result.data);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}
