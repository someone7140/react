import React, { useContext, useEffect, useRef } from "react";
import ChoiceTypeComponent from "./ChoiceTypeComponent";
import GoogleMapComponent from "./GoogleMapComponent";
import { MapStore } from "../../store/MapStore";
import { setCurrentLocation } from "../../service/GeolocationService";

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
      <ChoiceTypeComponent />
      {state.currentLocation && <GoogleMapComponent />}
    </div>
  );
}
