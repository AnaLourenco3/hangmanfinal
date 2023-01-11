import React from "react";
import { Routes, Route } from "react-router-dom";

import StartPage from "./Pages/StartPage";
import GamePage from "./Pages/GamePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/hangman" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
