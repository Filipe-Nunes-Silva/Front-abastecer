import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ViewFueling = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [open, setOpen] = useState(true);
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const handleClose = () => {
        setOpen(false);
        navigate('/fuelings');
    };

    const getDataFueling = async () => {
        const { data } = await api.getFueling(id);
        const vehicle = await api.getVehicle(data[0].vehicleId);
        const user = await api.getUser(data[0].userId);

        setVehicle(vehicle.data[0].model);
        setAmount(data[0].amount);
        setType(data[0].type);
        setValue(data[0].value);
        setCreatedBy(user.data[0].name);
    };

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
                            Dados do abastecimento
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField
                        id="amount"
                        label="Quantidade"
                        variant="outlined"
                        value={amount}
                    />
                    <TextField
                        id="type"
                        label="Tipo"
                        variant="outlined"
                        value={type}
                    />
                    <TextField
                        id="value"
                        label="Valor"
                        variant="outlined"
                        value={value}
                    />
                    <TextField
                        id="vehicle"
                        label="Veículo"
                        variant="outlined"
                        value={vehicle}
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

export default ViewFueling;