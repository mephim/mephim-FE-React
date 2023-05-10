import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Footer from '../Footer';
import Sidebar from '../commons/Sidebar';
import List from '../../pages/Admin/Show/List';
import AddNew from '../../pages/Admin/Show/AddNew';
import AddNewMovie from '../../pages/Admin/Movie/AddNew';
import List2 from '../../pages/Admin/Show/List2';
import ListMovie from '../../pages/Movie/ListMovie';
import ListRoom from '../../pages/Admin/Room';
import AddRoom from '../../pages/Admin/Room/AddNew';
import Static from '../../pages/Admin/Statis';
import Rate from '../../pages/Admin/Rate';
import User from '../../pages/Admin/User';
import Category from '../../pages/Admin/Category';
import EditMovie from '../../pages/Admin/Movie/Edit';

function AdminRoute() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, height: '100vh', overflowY: 'scroll', padding: 20 }}>
                    <Routes>
                        <Route path="list-show" element={<List />} />
                        <Route path="list-show-2" element={<List2 />} />
                        <Route path="add-show" element={<AddNew />} />
                        <Route path="list-movie" element={<ListMovie />} />
                        <Route path="add-movie" element={<AddNewMovie />} />
                        <Route path="edit-movie/:id" element={<EditMovie />} />
                        <Route path="list-room" element={<ListRoom />} />
                        <Route path="add-room" element={<AddRoom />} />
                        <Route path="static" element={<Static />} />
                        <Route path="rate" element={<Rate />} />
                        <Route path="category" element={<Category />} />
                        <Route path="user" element={<User />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default AdminRoute;
