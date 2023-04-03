import { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { api } from '../../services/api';
import { logout, checkLogin } from '../../helpers/ControlCookies';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditUser = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [open, setOpen] = useState(true);

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});

    const handleClose = () => {
        setOpen(false);
        navigate('/users');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length == 0) {
            setError(true);
            setMsgError({ ...msgError, name: 'Campo nome obrigatório' });
            return;
        };
        if (cpf.length == 0 || cpf.length < 11) {
            setError(true);
            setMsgError({ ...msgError, cpf: 'Campo cpf precisar ter 11 caracteres' });
            return;
        };
        if (phone.length == 0) {
            setError(true);
            setMsgError({ ...msgError, phone: 'Campo telefone obrigatório' });
            return;
        };

        const data = { name, cpf, phone };
        if (password.length > 0) {
            data.password = password;
        };
        const json = await api.editUser(data);
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };

        if (data.password) {
            alert('Você mudou a senha e foi deslogado, para continuar faça login novamente!');
            logout();
            navigate('/acess');
        };
        navigate('/users');
    };

    const deleteUser = async () => {
        const confirmDeletion = confirm('Deseja mesmo excluir sua conta?');
        if (confirmDeletion) {
            if (checkLogin()) {
                const json = await api.deleteUser();
                if (json.errors) {
                    setMsgError({ msg: json.errors[0].msg });
                    return;
                };
                logout();
                alert('Você excluir sua conta com sucesso!');
                return navigate('/');
            };
        }
        else {
            return;
        };
        navigate('/acess');
    };


    const getDataUser = async () => {
        const { data } = await api.getUser(id);
        setName(data[0].name);
        setCpf(data[0].cpf);
        setPhone(data[0].phone);
    };

    const getIdUser = async () => {
        const { data } = await api.getIdUser();
        setId(parseInt(data.id));
    };

    useEffect(() => {
        setError(false);
    }, [name, cpf, phone]);


    useEffect(() => {
        getDataUser();
    }, [id]);

    useEffect(() => {
        getIdUser();
    }, []);

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Editar
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Typography sx={{ color: 'red', marginTop: '20px', padding: '20px 0px 0px 20px' }}>
                    {msgError.msg}
                </Typography>
                <Typography sx={{ color: 'red', marginTop: '20px', paddingRight: '20px', textAlign: 'right' }}>
                    <span onClick={deleteUser}>
                        <DeleteForeverRoundedIcon sx={{ cursor: 'pointer' }} titleAccess='Excluir conta' />
                    </span>
                </Typography>
                <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField
                        id="name"
                        label="Nome"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.name}</span>) : ''}
                    />
                    <TextField
                        id="cpf"
                        label="CPF"
                        variant="outlined"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.cpf}</span>) : ''}
                    />
                    <TextField
                        id="phone"
                        label="Telefone"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.phone}</span>) : ''}
                    />
                    <Typography sx={{ padding: '0px 0px 0px 20px' }}>
                        Caso deseje alterar sua senha insira no campo abaixo uma nova senha, para manter a mesma senha deixe o campo em branco.
                    </Typography>
                    <TextField
                        id="password"
                        label="Nova senha"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
            </Dialog>
        </div>
    );
};

export default EditUser;