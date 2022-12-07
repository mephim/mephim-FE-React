import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BaseRouter from "./components/BaseRoute";
import MainRoute from "./components/BaseRoute/main-route";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main/*" element={<BaseRouter element={<MainRoute/>}/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
