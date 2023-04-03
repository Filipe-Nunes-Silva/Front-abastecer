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

const ViewVehicle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(true);

    const [model, setModel] = useState('');
    const [plate, setPlate] = useState('');
    const [color, setColor] = useState('');
    const [renavam, setRenavam] = useState('');
    const [potency, setPotency] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [createdBy, setCreatedBy] = useState('');

    const handleClose = () => {
        setOpen(false);
        navigate('/vehicles');
    };

    const getDataVehicle = async () => {
        const { data } = await api.getVehicle(id);
        const user = await api.getUser(data[0].userId);
        setCreatedBy(user.data[0].name);
        setModel(data[0].model);
        setPlate(data[0].plate);
        setColor(data[0].color);
        setRenavam(data[0].renavam);
        setPotency(data[0].potency);
        setBrand(data[0].brand);
        setDescription(data[0].description);
    };

    useEffect(() => {
        getDataVehicle();
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
                            Dados do veiculo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                    <TextField
                        id="model"
                        label="Modelo"
                        variant="outlined"
                        value={model}
                    />
                    <TextField
                        id="plate"
                        label="Placa"
                        variant="outlined"
                        value={plate}
                    />
                    <TextField
                        id="color"
                        label="Cor"
                        variant="outlined"
                        value={color}
                    />
                    <TextField
                        id="renavam"
                        label="Renavam"
                        variant="outlined"
                        value={renavam}
                    />
                    <TextField
                        id="potency"
                        label="Potência"
                        variant="outlined"
                        value={potency}
                    />
                    <TextField
                        id="brand"
                        label="Marca"
                        variant="outlined"
                        value={brand}
                    />
                    <TextField
                        id="description"
                        label="Descrição"
                        variant="outlined"
                        value={description}
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

export default ViewVehicle;