import React from "react";
import "./App.css";

import { Routes, Route, useParams } from "react-router-dom";
import Table from "./pages/Table";

const Dashboard = () => <Table />;

const Results = () => {
  const { testId } = useParams();
  return <h2>Results Page for Test ID: {testId}</h2>;
};

const Finalize = () => {
  const { testId } = useParams();
  return <h2>Finalize Page for Test ID: {testId}</h2>;
};

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


