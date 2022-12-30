import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import BaseRouter from "./components/BaseRoute";
import MainRoute from "./components/BaseRoute/main-route";
import Demo from "./components/DemoScheduler";
import AdminRoute from "./components/BaseRoute/admin-route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
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
      <ToastContainer />
    </Router>
  );
}

export default App;
