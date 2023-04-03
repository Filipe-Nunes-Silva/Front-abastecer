import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../../helpers/ControlCookies'

export default function DataGridFuelings() {

    const navigate = useNavigate();
    const [fuelings, setFuelings] = useState([]);
    const [updateFuelingList, setUpdateFuelingList] = useState(false);

    const getDataFuelings = async () => {
        const json = await api.getFuelings();
        setFuelings(json.data);
    };

    const newFueling = () => {
        navigate('/fuelings/new');
    };
    const getDataFueling = async (id) => {
        navigate(`/fuelings/view/${id}`);
    };
    const EditFueling = (id) => {
        navigate(`/fuelings/edit/${id}`);
    };
    const deleteFueling = async (id) => {
        if (checkLogin()) {
            const json = await api.deleteFueling(id);
            if (json.data.msg) {
                setUpdateFuelingList(!updateFuelingList);
            };
            return;
        };
        navigate('/acess');
    };

    useEffect(() => {
        getDataFuelings();
    }, []);

    useEffect(() => {
        getDataFuelings();
    }, [updateFuelingList]);

    return (
        <>
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={newFueling}>
                Adicionar
            </Button>

            <DataList
                nameHeader1='Tipo'
                nameHeader2='Quantidade'
                nameHeader3='Valor'
                field1='type'
                field2='amount'
                field3='value'
                functionEdit={EditFueling}
                functionDelete={deleteFueling}
                functionView={getDataFueling}
                data={fuelings}
            />
        </>
    );
};