import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

const DataGridUsers = () => {
    const [users, setUsers] = useState([]);

    const getDataUsers = async () => {
        const json = await api.getUsers();
        setUsers(json.data);
    };

    useEffect(() => {
        getDataUsers();
    }, []);

    return (
        <>
            <DataList
                nameHeader1='Nome'
                nameHeader2='CPF'
                nameHeader3='Telefone'
                field1='name'
                field2='cpf'
                field3='phone'
                data={users}
            />
        </>
    );
};

export default DataGridUsers;