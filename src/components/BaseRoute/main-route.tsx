import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../Header';
import Home from '../../pages/Home';
import Footer from '../Footer';
import ChooseSeat from '../ChooseSeat';
import PaymentControl from '../../pages/PaymentControl';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import RequestVerifyCode from '../../pages/RequestCode';
import ResetPassword from '../../pages/ResetPassword';

function MainRoute() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='seat-selection' element={<ChooseSeat />} />
                <Route path='payment' element={<PaymentControl />} />
                <Route path='*' element={<Navigate replace to='/404' />} />
            </Routes>
            <Footer />
        </>
    );
}

export default MainRoute;
