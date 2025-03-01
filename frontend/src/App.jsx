import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import Results from "./pages/Results";
import Finalize from "./pages/Finalize";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="/results/:testId" element={<Results />} />
      <Route path="/finalize/:testId" element={<Finalize />} />
    </Routes>
  );
}

export default App;


