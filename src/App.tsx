import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import BaseRouter from './components/BaseRoute';
import MainRoute from './components/BaseRoute/main-route';
import Demo from './components/DemoScheduler';
import AdminRoute from './components/BaseRoute/admin-route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import RequestVerifyCode from './pages/RequestCode';
import ResetPassword from './pages/ResetPassword';
import Verify from './pages/Verify';
import NotFound404 from './pages/NotFound404';
import MovieShowing from './pages/Movie/MovieShowing';
import MovieComingSoon from './pages/Movie/MovieComingSoon';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route
                        path='/*'
                        element={<BaseRouter element={<MainRoute />} />}
                    />
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                    <Route path='requestCode' element={<RequestVerifyCode />} />
                    <Route path='resetPassword' element={<ResetPassword />} />
                    <Route path='verify' element={<Verify />} />
                    <Route
                        path='/admin/*'
                        element={<BaseRouter element={<AdminRoute />} />}
                    />
                    <Route path='/demo' element={<Demo />} />
                    <Route path='/404' element={<NotFound404 />} />
                    <Route path='*' element={<Navigate replace to='/404' />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
