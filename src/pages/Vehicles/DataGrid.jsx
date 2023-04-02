import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

export default function DataGridVehicles() {

    const [vehicles, setVehicles] = useState([]);

    const getDataVehicles = async () => {
        const json = await api.getVehicles();
        setVehicles(json.data);
    };

    useEffect(() => {
        getDataVehicles();
    }, []);

    return (
        <>
            <DataList
                nameHeader1='Modelo'
                nameHeader2='Placa'
                nameHeader3='Cor'
                field1='model'
                field2='plate'
                field3='color'
                data={vehicles}
            />
        </>
    );
};
