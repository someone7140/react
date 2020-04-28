import React from "react";
import "./App.css";
import { MapProvider } from "./store/MapStore";
import DeliverlyComponent from "./components/DeliverlyComponent";

function App() {
  return (
    <div>
      <MapProvider>
        <DeliverlyComponent />
      </MapProvider>
    </div>
  );
}

export default App;
