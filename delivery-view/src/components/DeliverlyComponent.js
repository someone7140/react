import React, { useContext, useEffect, useRef } from "react";
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
      <ChoiceTypeComponent />
      {state.currentLocation && <GoogleMapComponent />}
    </div>
  );
}
