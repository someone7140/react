import "./App.css";
import { AutoCompleteSample } from "./components/AutoCompleteSample";
import { PopperPopoverSample } from "./components/PopperPopoverSample";
import { TooltipSample } from "./components/TooltipSample";

function App() {
  return (
    <>
      <PopperPopoverSample />
      <AutoCompleteSample />
      <TooltipSample />
    </>
  );
}

export default App;
