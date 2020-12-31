import { useState } from "react";
import PhishSiteSearchResult from "./PhishSiteSearchResult";

export default function PhishSiteSearch() {
  const inputURLStyle = {
    marginTop: 10,
    marginRight: 10,
    width: "70%",
  };

  const [inputUrl, setInputUrl] = useState(undefined);
  const [searchUrl, setSearchUrl] = useState(undefined);
  const [searchedFlg, setSearchedFlg] = useState(false);

  function onChangeInputURL(e) {
    setInputUrl(e.target.value);
  }

  function onClickSearchButton() {
    setSearchUrl(inputUrl);
    setSearchedFlg(true);
  }
  return (
    <div className="text-center">
      検索したいURLを入力してください
      <br />
      <input
        type="text"
        name="inputURL"
        placeholder="http://www.example.com"
        onChange={onChangeInputURL}
        style={inputURLStyle}
      />
      <input
        type="button"
        name="searchButton"
        value="検索"
        disabled={!inputUrl || inputUrl.length < 1}
        onClick={onClickSearchButton}
      />
      <br />
      <br />
      {!searchedFlg && <PhishSiteSearchResult searched={false} />}
      {searchedFlg && (
        <PhishSiteSearchResult searched={true} inputUrl={searchUrl} />
      )}
    </div>
  );
}
