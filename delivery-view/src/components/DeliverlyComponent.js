import React, { useContext, useEffect, useRef } from "react";
import StoreListComponent from "./list/StoreListComponent";
import ChoiceTypeComponent from "./map/ChoiceTypeComponent";
import GoogleMapComponent from "./map/GoogleMapComponent";
import SearchComponent from "./search/SearchComponent";
import { MapStore } from "../store/MapStore";
import { setCurrentLocation } from "../service/GeolocationService";

export default function MapComponent() {
  const { state, dispatch } = useContext(MapStore);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      setCurrentLocation(state, dispatch);
    }
    mounted.current = true;
  }, [state, dispatch]);
  return (
    <div>
      {state.geocoder && <SearchComponent />}
      <br />
      <ChoiceTypeComponent />
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              {state.displayStoreList.length > 0 && <StoreListComponent />}
            </td>
            <td>
              <a
                href="https://api.gnavi.co.jp/api/scope/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.gnavi.co.jp/api/img/credit/api_155_20.gif"
                  width="155"
                  height="20"
                  border="0"
                  alt="グルメ情報検索サイト　ぐるなび"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      {state.currentLocation && <GoogleMapComponent />}
      {!state.currentLocation && <span>地図の読み込み中です・・</span>}
    </div>
  );
}
