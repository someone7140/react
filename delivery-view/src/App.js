import React from "react";
import "./App.css";
import { MapProvider } from "./store/MapStore";
import MapComponent from "./components/map/MapComponent";

function App() {
  return (
    <div>
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </div>
  );
}

export default App;
