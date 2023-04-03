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

const EditFueling = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(true);

    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});

    const handleClose = () => {
        setOpen(false);
        navigate('/fuelings');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount.length == 0) {
            setError(true);
            setMsgError({ ...msgError, amount: 'Campo quantidade obrigatório' });
            return;
        };
        if (type.length == 0) {
            setError(true);
            setMsgError({ ...msgError, type: 'Campo tipo obrigatório' });
            return;
        };
        if (value.length == 0) {
            setError(true);
            setMsgError({ ...msgError, value: 'Campo valor obrigatório' });
            return;
        };

        const data = { amount, type, value };
        const json = await api.editFueling(id, data);
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };

        navigate('/fuelings');
    };


    const getDataFueling = async () => {
        const { data } = await api.getFueling(id);
        setAmount(data[0].amount);
        setType(data[0].type);
        setValue(data[0].value);
    };

    useEffect(() => {
        setError(false);
    }, [amount, type, value]);


    useEffect(() => {
        getDataFueling();
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
                <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField
                        id="amount"
                        label="Quantidade"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.amount}</span>) : ''}
                    />
                    <TextField
                        id="type"
                        label="Tipo"
                        variant="outlined"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.type}</span>) : ''}
                    />
                    <TextField
                        id="value"
                        label="Valor"
                        variant="outlined"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.value}</span>) : ''}
                    />
                </form>
            </Dialog>
        </div>
    );
};

export default EditFueling;