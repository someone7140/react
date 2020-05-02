import React, { useContext, useEffect, useState, useRef } from "react";
import CategoryComponent from "./CategoryComponent";
import { setCategoryLList } from "../../service/CategoryService";
import { searchPlace } from "../../service/GeolocationService";
import { MapStore } from "../../store/MapStore";

export default function SearchComponent() {
  const { state, dispatch } = useContext(MapStore);
  const [place, setPlace] = useState("");
  const searchTextStyle = {
    width: "200px",
    height: "18px",
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      setCategoryLList(dispatch);
    }
    mounted.current = true;
  }, [state, dispatch]);

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleSearch() {
    searchPlace(state, dispatch, place);
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>場所</td>
            <td>
              <input
                type="text"
                name="place"
                value={place}
                onChange={handleChangePlace}
                placeholder="空欄の場合は現在地で検索します"
                style={searchTextStyle}
              />
            </td>
            <td>{state.categoryLList.length > 0 && <CategoryComponent />}</td>
            <td>
              <input type="button" value="検索する" onClick={handleSearch} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
