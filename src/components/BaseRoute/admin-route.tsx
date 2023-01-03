import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Footer from '../Footer';
import Sidebar from '../commons/Sidebar';
import List from '../../pages/Admin/Show/List';
import AddNew from '../../pages/Admin/Show/AddNew';

function AdminRoute() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                    <Route path='list-show' element={<List />} />
                    <Route path='add-show' element={<AddNew />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default AdminRoute;
