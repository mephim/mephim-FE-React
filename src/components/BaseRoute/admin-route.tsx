import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Footer from '../Footer';
import Sidebar from '../commons/Sidebar';
import List from '../../pages/Admin/Show/List';
import AddNew from '../../pages/Admin/Show/AddNew';
import AddNewMovie from '../../pages/Admin/Movie/AddNew';
import List2 from '../../pages/Admin/Show/List2';
import ListMovie from '../../pages/Movie/ListMovie';

function AdminRoute() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                    <Route path='list-show' element={<List />} />
                    <Route path='list-show-2' element={<List2 />} />
                    <Route path='add-show' element={<AddNew />} />
                    <Route path='list-movie' element={<ListMovie />} />
                    <Route path='add-movie' element={<AddNewMovie />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default AdminRoute;
