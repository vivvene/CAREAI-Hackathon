import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Assessment from "./pages/assessment";
import Results from "./pages/results";
import Report from "./pages/report";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/results" element={<Results />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default App;