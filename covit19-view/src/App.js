import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <RecoilRoot>
      <MainComponent />
    </RecoilRoot>
  );
}

export default App;
