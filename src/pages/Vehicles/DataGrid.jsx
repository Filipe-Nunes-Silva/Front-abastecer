import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { checkLogin } from "../../helpers/ControlCookies";

export default function DataGridVehicles() {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [updateVehicleList, setUpdateVehicleList] = useState(false);

    const getDataVehicles = async () => {
        const json = await api.getVehicles();
        setVehicles(json.data);
    };

    const newVehicle = () => {
        navigate('/vehicles/new');
    };
    const getDataVehicle = async (id) => {
        navigate(`/vehicles/view/${id}`);
    };
    const EditVehicle = (id) => {
        navigate(`/vehicles/edit/${id}`);
    };
    const deleteVehicle = async (id) => {
        if (checkLogin()) {
            const json = await api.deleteVehicle(id);
            if (json.data.msg) {
                setUpdateVehicleList(!updateVehicleList);
            };
            return;
        };
        navigate('/acess');
    };

    useEffect(() => {
        getDataVehicles();
    }, []);

    useEffect(() => {
        getDataVehicles();
    }, [updateVehicleList]);


    return (
        <>

            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={newVehicle}>
                Adicionar
            </Button>

            <DataList
                nameHeader1='Modelo'
                nameHeader2='Placa'
                nameHeader3='Cor'
                field1='model'
                field2='plate'
                field3='color'
                functionEdit={EditVehicle}
                functionDelete={deleteVehicle}
                functionView={getDataVehicle}
                data={vehicles}
            />
        </>
    );
};
