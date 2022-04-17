import { useControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function GeocoderControl(prop) {
  const noop = () => {};

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...prop,
        accessToken: process.env.MAPBOX_TOKEN,
      });
      ctrl.on("loading", noop);
      ctrl.on("results", noop);
      ctrl.on("result", (evt) => {
        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location) {
          prop.setMarkerPin({ longitude: location[0], latitude: location[1] });
        }
      });
      ctrl.on("error", noop);
      return ctrl;
    },
    {
      position: prop.position,
    }
  );

  if (geocoder._map) {
    if (
      geocoder.getProximity() !== prop.proximity &&
      prop.proximity !== undefined
    ) {
      geocoder.setProximity(prop.proximity);
    }
    if (
      geocoder.getRenderFunction() !== prop.render &&
      prop.render !== undefined
    ) {
      geocoder.setRenderFunction(prop.render);
    }
    if (
      geocoder.getLanguage() !== prop.language &&
      prop.language !== undefined
    ) {
      geocoder.setLanguage(prop.language);
    }
    if (geocoder.getZoom() !== prop.zoom && prop.zoom !== undefined) {
      geocoder.setZoom(prop.zoom);
    }
    if (geocoder.getFlyTo() !== prop.flyTo && prop.flyTo !== undefined) {
      geocoder.setFlyTo(prop.zoom);
    }
    if (
      geocoder.getPlaceholder() !== prop.placeholder &&
      prop.placeholder !== undefined
    ) {
      geocoder.setPlaceholder(prop.zoom);
    }
    if (
      geocoder.getCountries() !== prop.countries &&
      prop.countries !== undefined
    ) {
      geocoder.setCountries(prop.zoom);
    }
    if (geocoder.getTypes() !== prop.types && prop.types !== undefined) {
      geocoder.setTypes(prop.zoom);
    }
    if (
      geocoder.getMinLength() !== prop.minLength &&
      prop.minLength !== undefined
    ) {
      geocoder.setMinLength(prop.zoom);
    }
    if (geocoder.getLimit() !== prop.limit && prop.limit !== undefined) {
      geocoder.setLimit(prop.zoom);
    }
    if (geocoder.getFilter() !== prop.filter && prop.filter !== undefined) {
      geocoder.setFilter(prop.zoom);
    }
    if (geocoder.getOrigin() !== prop.origin && prop.origin !== undefined) {
      geocoder.setOrigin(prop.zoom);
    }
    if (
      geocoder.getAutocomplete() !== prop.autocomplete &&
      prop.autocomplete !== undefined
    ) {
      geocoder.setAutocomplete(prop.zoom);
    }
    if (
      geocoder.getFuzzyMatch() !== prop.fuzzyMatch &&
      prop.fuzzyMatch !== undefined
    ) {
      geocoder.setFuzzyMatch(prop.zoom);
    }
    if (geocoder.getRouting() !== prop.routing && prop.routing !== undefined) {
      geocoder.setRouting(prop.zoom);
    }
    if (
      geocoder.getWorldview() !== prop.worldview &&
      prop.worldview !== undefined
    ) {
      geocoder.setWorldview(prop.zoom);
    }
  }
  return <></>;
}
