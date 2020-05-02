import React, { useReducer } from "react";
import MapReducer from "../reducer/MapReducer";

const initialState = {
  currentLocation: undefined,
  selectedCategory: [],
  storeList: [],
  displayStoreList: [],
  choiceType: ["deliverly", "takeout"],
  geocoder: undefined,
  categoryLList: [],
};

const MapStore = React.createContext();

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState);
  return (
    <MapStore.Provider value={{ state, dispatch }}>
      {children}
    </MapStore.Provider>
  );
};

export { MapProvider, MapStore };
