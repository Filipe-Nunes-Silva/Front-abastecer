import DataList from "../../components/DataList/DataList";
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { checkLogin } from "../../helpers/ControlCookies";

export default function DataGridUsers() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const getDataUsers = async () => {
        const json = await api.getUsers();
        setUsers(json.data);
    };

    const newUser = () => {
        navigate('/users/new');
    };
    const getDataUser = async (id) => {
        navigate(`/users/view/${id}`);
    };

    useEffect(() => {
        getDataUsers();
    }, []);


    return (
        <>
            <Button variant="contained" sx={{ marginTop: '20px' }} onClick={newUser}>
                Adicionar
            </Button>

            <DataList
                nameHeader1='Nome'
                nameHeader2='CPF'
                nameHeader3='Telefone'
                field1='name'
                field2='cpf'
                field3='phone'
                functionView={getDataUser}
                itUserPage={true}
                data={users}
            />
        </>
    );
};
