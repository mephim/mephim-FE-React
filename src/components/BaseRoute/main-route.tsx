import { Route, Routes, useLocation } from 'react-router-dom';
import React from "react";
import Header from "../Header";
import Home from "../../pages/Home";
import Footer from "../Footer";
import ChooseSeat from "../ChooseSeat";

function MainRoute() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="seat-selection" element={<ChooseSeat />} />
            </Routes>
            <Footer/>
        </>
    );
}

export default MainRoute;
