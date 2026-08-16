import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Report from "./pages/Report";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/assessment"
          element={<Assessment />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/report"
          element={<Report />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;