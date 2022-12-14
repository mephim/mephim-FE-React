import { Route, Routes } from 'react-router-dom';
import React from "react";
import Header from "../Header";
import Home from "../../pages/Home";
import Footer from "../Footer";
import ChooseSeat from "../ChooseSeat";
import PaymentControl from "../PaymentControl";

function MainRoute() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="seat-selection" element={<ChooseSeat />} />
                <Route path="payment" element={<PaymentControl />} />
            </Routes>
            <Footer/>
        </>
    );
}

export default MainRoute;
