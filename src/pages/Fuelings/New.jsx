import { forwardRef, Fragment, useEffect, useState } from 'react';
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
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { api } from '../../services/api';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NewFueling = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [modelVehicle, setModelVehicle] = useState('');
    const [listVehicles, setListVehicles] = useState([]);

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});

    const handleClose = () => {
        setOpen(false);
        navigate('/fuelings');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount.length <= 0) {
            setError(true);
            setMsgError({ ...msgError, amount: 'Campo quantidade obrigatório' });
            return;
        };
        if (type.length <= 0) {
            setError(true);
            setMsgError({ ...msgError, type: 'Campo tipo obrigatório' });
            return;
        };
        if (value.length <= 0) {
            setError(true);
            setMsgError({ ...msgError, value: 'Campo valor obrigatório' });
            return;
        };
        if (vehicleId.length <= 0) {
            setError(true);
            setMsgError({ ...msgError, msg: 'Escolha o veículo' });
            return;
        };

        const json = await api.newFueling({ amount, type, value, vehicleId });
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };

        navigate('/fuelings');
    };

    useEffect(() => {
        setError(false);
    }, [amount, type, value, vehicleId]);

    //Choose Vehicle
    const chooseVehicle = async () => {
        const json = await api.getVehicles();
        setListVehicles(json.data);
        handleClickOpenChooseVehicle();
    };

    const confirmVehicle = (id) => {
        setVehicleId(id);
        handleCloseChooseVehicle();
    };

    const [openChooseVehicle, setOpenChooseVehicle] = useState(false);

    const handleClickOpenChooseVehicle = () => {
        setOpenChooseVehicle(true);
    };

    const handleCloseChooseVehicle = () => {
        setOpenChooseVehicle(false);
    };

    useEffect(() => {
        listVehicles.map((item) => {
            if (item.id === vehicleId) {
                setModelVehicle(item.model);
            };
        });
    }, [vehicleId]);

    return (
        <>
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
                                Novo Abastecimento
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleSubmit}>
                                Salvar
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{ marginLeft: '20px' }}>
                        <Button variant="contained" sx={{ marginTop: '20px' }} onClick={chooseVehicle}>
                            Escolher veículo
                        </Button>
                    </div>
                    <Typography sx={{ color: 'red', marginTop: '20px', padding: '20px 0px 0px 20px' }}>
                        {msgError.msg}
                    </Typography>
                    <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                        {vehicleId &&
                            <TextField
                                id="vehicleId"
                                label="Veículo"
                                variant="outlined"
                                value={modelVehicle}
                            />
                        }
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

            <div>
                <Dialog
                    fullScreen
                    open={openChooseVehicle}
                    onClose={handleCloseChooseVehicle}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseChooseVehicle}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Escolha o veículo
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <List>
                        {listVehicles.map((item, index) => (

                            <Fragment key={item.id}>
                                <ListItem button key={index} onClick={() => confirmVehicle(item.id)}>
                                    <ListItemText primary={item.model} secondary={item.plate} />
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))}
                    </List>
                </Dialog>
            </div>

        </>
    );
};

export default NewFueling;