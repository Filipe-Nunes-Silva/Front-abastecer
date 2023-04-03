import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../helpers/ControlCookies';
import { useContext } from 'react';
import { Context } from '../../contexts/Context';
import { useState } from 'react';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const NavBar = () => {
    const { state, dispatch } = useContext(Context);

    const logoutUser = () => {
        logout();
        dispatch({
            type: 'CHANGE_LOGED',
            payload: {
                isLogged: false,
            },
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={handleOpen}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>Abastecer</Link>
                        </Typography>

                        {!state.user.isLogged ?
                            <Button color="inherit">
                                <Link to='/acess' style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
                            </Button>
                            :
                            <Button color="inherit" onClick={logoutUser}>Sair</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                            Menu
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '20px' }}>
                            <Button color="inherit">
                                <Link to='/vehicles' style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>Veículos</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/fuelings' style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>Abastecimento</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/users' style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>Usúarios</Link>
                            </Button>
                            <Button color="inherit">
                                <Link to='/users/edit' style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClose}>Editar Conta</Link>
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>

    );
};

export default NavBar;