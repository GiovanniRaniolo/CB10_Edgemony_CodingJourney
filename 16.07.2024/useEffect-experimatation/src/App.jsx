import React from "react";
import FirstRenderEffect from "./components/FirstRenderEffect";
import FirstRenderAndLocalStorage from "./components/FirstRenderAndLocalStorage";
import DependencyChangeEffect from "./components/DependencyChangeEffect";
import CleanupEffect from "./components/CleanupEffect";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">useEffect Examples</h1>
      <FirstRenderEffect />
      <FirstRenderAndLocalStorage />
      <DependencyChangeEffect />
      <CleanupEffect />
    </div>
  );
}

export default App;
