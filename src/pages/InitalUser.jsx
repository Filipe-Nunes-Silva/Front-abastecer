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
import { api } from '../services/api';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InitialUser = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});

    const handleClose = () => {
        setOpen(false);
        navigate('/');
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
        if (password.length == 0) {
            setError(true);
            setMsgError({ ...msgError, password: 'Campo senha obrigatório' });
            return;
        };

        const json = await api.initialUser({ name, cpf, password, phone });
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };
        alert('Cadastrado com sucesso! faça login para continuar.');
        navigate('/');
    };

    useEffect(() => {
        setError(false);
    }, [name, cpf, password, phone]);

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
                            Novo Usúario
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Typography sx={{ color: 'red', marginTop: '20px', padding: '20px 0px 0px 20px' }}>
                    {msgError.msg}
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
                        id="password"
                        label="Senha"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.password}</span>) : ''}
                    />
                    <TextField
                        id="phone"
                        label="Telefone"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                </form>
            </Dialog>
        </div>
    );
};

export default InitialUser;