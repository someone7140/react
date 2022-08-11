// instagramのjavascriptを読み込んで実行
export function execInstagramJs(document) {
  const script = document.createElement("script");
  script.type = "text/javascript";

  var attr = document.createAttribute("src");
  attr.value = "//www.instagram.com/embed.js";
  script.setAttributeNode(attr);

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}

// URLがインスタのものか判定
export function isInstagramUrl(url) {
  try {
    const uri = new URL(url);
    return uri.hostname.endsWith("instagram.com");
  } catch (_) {
    return false;
  }
}

// コーディネート投稿のIDから個別投稿のURLを取得
export function getCoordinateUrl(coordinateId) {
  if (typeof window !== "undefined") {
    return (
      "https://" +
      window.location.hostname +
      "/coordinate/coordinatePost?coordinateId=" +
      coordinateId
    );
  } else {
    return "";
  }
}
