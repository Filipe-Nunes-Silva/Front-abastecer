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

const EditVehicle = () => {
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

    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});

    const handleClose = () => {
        setOpen(false);
        navigate('/vehicles');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (model.length == 0) {
            setError(true);
            setMsgError({ ...msgError, model: 'Campo modelo obrigatório' });
            return;
        };
        if (plate.length == 0 || plate.length < 7) {
            setError(true);
            setMsgError({ ...msgError, plate: 'Campo placa obrigatório' });
            return;
        };
        if (color.length == 0) {
            setError(true);
            setMsgError({ ...msgError, color: 'Campo cor obrigatório' });
            return;
        };
        if (renavam.length == 0) {
            setError(true);
            setMsgError({ ...msgError, renavam: 'Campo renvam obrigatório' });
            return;
        };

        const data = { model, plate, color, renavam, potency, brand, description };
        const json = await api.editVehicle(id, data);
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };

        navigate('/vehicles');
    };


    const getDataVehicle = async () => {
        const { data } = await api.getVehicle(id);
        setModel(data[0].model);
        setPlate(data[0].plate);
        setColor(data[0].color);
        setRenavam(data[0].renavam);
        setPotency(data[0].potency);
        setBrand(data[0].brand);
        setDescription(data[0].description);
    };

    useEffect(() => {
        setError(false);
    }, [model, plate, color, renavam]);


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
                        id="model"
                        label="Modelo"
                        variant="outlined"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.model}</span>) : ''}
                    />
                    <TextField
                        id="plate"
                        label="Placa"
                        variant="outlined"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.plate}</span>) : ''}
                    />
                    <TextField
                        id="color"
                        label="Cor"
                        variant="outlined"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.color}</span>) : ''}
                    />
                    <TextField
                        id="renavam"
                        label="Renavam"
                        variant="outlined"
                        value={renavam}
                        onChange={(e) => setRenavam(e.target.value)}
                        helperText={error ? (<span style={{ color: 'red' }}>{msgError.renavam}</span>) : ''}
                    />
                    <TextField
                        id="potency"
                        label="Potência"
                        variant="outlined"
                        value={potency}
                        onChange={(e) => setPotency(e.target.value)}
                    />
                    <TextField
                        id="brand"
                        label="Marca"
                        variant="outlined"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <TextField
                        id="description"
                        label="Descrição"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
            </Dialog>
        </div>
    );
};

export default EditVehicle;