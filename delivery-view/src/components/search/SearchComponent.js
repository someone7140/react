import React, { useContext, useState } from "react";
import { searchPlace } from "../../service/GeolocationService";
import { MapStore } from "../../store/MapStore";

export default function SearchComponent() {
  const { state, dispatch } = useContext(MapStore);
  const [place, setPlace] = useState("");
  const searchTextStyle = {
    width: "200px",
    height: "18px",
  };
  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleSearch() {
    searchPlace(state, dispatch, place);
  }

  return (
    <div>
      場所&nbsp;&nbsp;
      <input
        type="text"
        name="place"
        value={place}
        onChange={handleChangePlace}
        placeholder="空欄の場合は現在地で検索します"
        style={searchTextStyle}
      />
      &nbsp;&nbsp;
      <input type="button" value="検索する" onClick={handleSearch} />
    </div>
  );
}
