import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import BaseRouter from "./components/BaseRoute";
import MainRoute from "./components/BaseRoute/main-route";
import Demo from "./components/DemoScheduler";
import AdminRoute from "./components/BaseRoute/admin-route";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/main/*"
            element={<BaseRouter element={<MainRoute />} />}
          />
          <Route path="/transaction" element={<Login />} />
          <Route
              path="/admin/*"
              element={<BaseRouter element={<AdminRoute />} />}
          />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
