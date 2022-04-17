import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

import GeocoderControl from "./GeocoderControl";
import MarkerPin from "./MarkerPin";

export default function MapboxComponent(prop) {
  function onDragEnd(e) {
    const viewState = e.viewState;
    if (viewState) {
      prop.setMarkerPin({
        latitude: viewState.latitude,
        longitude: viewState.longitude,
      });
    }
  }

  function onLoadMap(e) {
    const map = e?.target;
    if (map) {
      // 言語設定
      const language = new MapboxLanguage({
        defaultLanguage: "ja",
      });
      map.addControl(language);
      language._initialStyleUpdate();
    }
  }

  return (
    <Map
      initialViewState={{
        latitude: prop.markerPin.latitude,
        longitude: prop.markerPin.longitude,
        zoom: 13,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      style={{ height: "350px", width: "100%" }}
      attributionControl={false}
      onDragEnd={onDragEnd}
      onLoad={onLoadMap}
    >
      <Marker
        latitude={prop.markerPin.latitude}
        longitude={prop.markerPin.longitude}
      >
        <MarkerPin />
      </Marker>
      <NavigationControl />
      <GeocoderControl setMarkerPin={prop.setMarkerPin} position="top-left" />
    </Map>
  );
}
