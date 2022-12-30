import { Route, Routes } from 'react-router-dom';
import React from "react";
import Header from "../Header";
import Home from "../../pages/Home";
import Footer from "../Footer";
import ChooseSeat from "../ChooseSeat";
import PaymentControl from "../PaymentControl";
import Register from "../../pages/Register";
import Login from "../../pages/Login";

function MainRoute() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="seat-selection" element={<ChooseSeat />} />
                <Route path="payment" element={<PaymentControl />} />
            </Routes>
            <Footer/>
        </>
    );
}

export default MainRoute;
