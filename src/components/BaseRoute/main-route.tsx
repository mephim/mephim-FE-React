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
import MovieShowing from '../../pages/Movie/MovieShowing';
import MovieComingSoon from '../../pages/Movie/MovieComingSoon';
import MovieDetail from '../../pages/Movie/MovieDetail';
import PaymentResult from '../../pages/PaymentResult';

function MainRoute() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='seat-selection' element={<ChooseSeat />} />
                <Route path='payment' element={<PaymentControl />} />
                <Route path='payment/result' element={<PaymentResult />} />
                <Route path='*' element={<Navigate replace to='/404' />} />
                <Route path='showing' element={<MovieShowing />} />
                <Route path='comingsoon' element={<MovieComingSoon />} />
                <Route path='movie/detail/:id' element={<MovieDetail/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default MainRoute;
