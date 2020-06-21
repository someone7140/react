import React from "react";
import "./App.css";
import TwitterSearchComponent from "./components/TwitterSearchComponent";
import { TwitterSearchProvider } from "./store/TwitterSearchStore";

function App() {
  return (
    <div>
      <TwitterSearchProvider>
        <TwitterSearchComponent />
      </TwitterSearchProvider>
    </div>
  );
}

export default App;
