import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(true);

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const handleClose = () => {
        setOpen(false);
        navigate('/users');
    };

    const getDataUser = async () => {
        const { data } = await api.getUser(id);
        const user = await api.getUser(data[0].createByUser);
        setName(data[0].name);
        setCpf(data[0].cpf);
        setPhone(data[0].phone);
        setCreatedBy(user.data[0].name);
    };

    useEffect(() => {
        getDataUser();
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
                            Dados do usúario
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField
                        id="name"
                        label="Nome"
                        variant="outlined"
                        value={name}
                    />
                    <TextField
                        id="cpf"
                        label="CPF"
                        variant="outlined"
                        value={cpf}
                    />
                    <TextField
                        id="phone"
                        label="Telefone"
                        variant="outlined"
                        value={phone}
                    />
                    <TextField
                        id="createdBy"
                        label="Criado por"
                        variant="outlined"
                        value={createdBy}
                    />
                </form>
            </Dialog>
        </div>
    );
};

export default ViewUser;