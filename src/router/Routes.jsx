import { Route, Routes } from 'react-router-dom';
import VerifyAuth from '../components/Auth/VerifyAuth';

import Index from '../pages/Index';
import SignIn from '../components/SignIn/SignIn';
import DataGridVehicles from '../pages/Vehicles/DataGrid';
import NewVehicle from '../pages/Vehicles/New';
import EditVehicle from '../pages/Vehicles/Edit';
import ViewVehicle from '../pages/Vehicles/View';
import DataGridFuelings from '../pages/Fuelings/DataGrid';
import NewFueling from '../pages/Fuelings/New';
import EditFueling from '../pages/Fuelings/Edit';
import ViewFueling from '../pages/Fuelings/View';
import DataGridUsers from '../pages/Users/DataGrid';
import NewUser from '../pages/Users/New';
import EditUser from '../pages/Users/Edit';
import ViewUser from '../pages/Users/View';



const RouterHandle = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/vehicles' element={<DataGridVehicles />} />
            <Route path='/vehicles/new' element={<VerifyAuth> <NewVehicle /> </VerifyAuth>} />
            <Route path='/vehicles/edit/:id' element={<VerifyAuth> <EditVehicle /> </VerifyAuth>} />
            <Route path='/vehicles/view/:id' element={<ViewVehicle />} />
            <Route path='/fuelings' element={<DataGridFuelings />} />
            <Route path='/fuelings/new' element={<VerifyAuth> <NewFueling /> </VerifyAuth>} />
            <Route path='/fuelings/edit/:id' element={<VerifyAuth> <EditFueling /> </VerifyAuth>} />
            <Route path='/fuelings/view/:id' element={<ViewFueling />} />
            <Route path='/users' element={<VerifyAuth> <DataGridUsers /> </VerifyAuth>} />
            <Route path='/users/new' element={<VerifyAuth> <NewUser /> </VerifyAuth>} />
            <Route path='/users/edit' element={<VerifyAuth> <EditUser /> </VerifyAuth>} />
            <Route path='/users/view/:id' element={<VerifyAuth><ViewUser /></VerifyAuth>} />
            <Route path='/acess' element={<SignIn />} />
        </Routes>
    );
};

export default RouterHandle;