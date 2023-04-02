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

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
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
    );
};

export default NavBar;