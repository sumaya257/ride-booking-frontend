import React from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <div>
            admin
            <Outlet/>
        </div>
    );
};

export default AdminLayout;