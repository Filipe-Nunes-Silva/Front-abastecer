import { Route, Routes } from 'react-router-dom';
import VerifyAuth from '../components/Auth/VerifyAuth';

import Index from '../pages/Index';
import DataGridFuelings from '../pages/Fuelings/DataGrid';
import DataGridVehicles from '../pages/Vehicles/DataGrid';
import DataGridUsers from '../pages/Users/DataGrid';
import SignIn from '../components/SignIn/SignIn';

const RouterHandle = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/vehicles' element={<DataGridVehicles />} />
            <Route path='/fuelings' element={<DataGridFuelings />} />
            <Route path='/users' element={<VerifyAuth> <DataGridUsers /> </VerifyAuth>} />
            <Route path='/acess' element={<SignIn />} />
        </Routes>
    );
};

export default RouterHandle;