import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

export default function DataGridFuelings() {

    const [fuelings, setFuelings] = useState([]);

    const getDataFueling = async () => {
        const json = await api.getFueling();
        setFuelings(json.data);
    };

    useEffect(() => {
        getDataFueling();
    }, []);

    return (
        <>
            <DataList
                nameHeader1='Tipo'
                nameHeader2='Quantidade'
                nameHeader3='Valor'
                field1='type'
                field2='amount'
                field3='value'
                data={fuelings}
            />
        </>
    );
};