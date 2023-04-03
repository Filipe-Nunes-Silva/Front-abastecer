import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { loggedIn } from '../../helpers/ControlCookies';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { Context } from '../../contexts/Context';

export default function SignIn() {

    const { state, dispatch } = useContext(Context);

    const navigate = useNavigate();
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState({});
    const [msgSucess, setMsgSucess] = useState('');
    const [open, setOpen] = useState(true);

    const handleSubmit = async () => {

        if (cpf.length == 0) {
            const err = { cpf: 'Preencha o campo CPF !' };
            setMsgError(err);
            setError(true);
            return;
        };
        if (password.length == 0) {
            const err = { password: 'Preencha o campo senha !' };
            setMsgError(err);
            setError(true);
            return;
        };

        const json = await api.signIn(cpf, password);
        if (json.errors) {
            setMsgError({ msg: json.errors[0].msg });
            return;
        };
        const token = json.data.token;
        loggedIn(token);

        setMsgSucess('Seja bem vindo!');
        dispatch({
            type: 'CHANGE_LOGED',
            payload: {
                isLogged: true,
            },
        });

        setTimeout(() => {
            successfullyLoggedIn();
        }, 2000)
    };

    const handleSignInClose = () => {
        dispatch({
            type: 'CHANGE_LOGED',
            payload: {
                isLogged: false,
            },
        });
        setCpf('');
        setPassword('');
        setMsgError({});
        setError(false);
        setMsgSucess('');
        setOpen(false);
        navigate('/');
    };

    const successfullyLoggedIn = () => {
        setCpf('');
        setPassword('');
        setMsgError({});
        setError(false);
        setMsgSucess('');
        setOpen(false);
        navigate('/');
    };



    useEffect(() => {
        if (error) {
            setError(false);
        };
    }, [password, cpf])
    useEffect(() => {
        const token = loggedIn();
        if (token) {
            dispatch({
                type: 'CHANGE_LOGED',
                payload: {
                    isLogged: true,
                },
            });
        };
    }, []);

    return (
        <>

            <div>
                <Dialog open={open} onClose={handleSignInClose}>
                    <DialogTitle style={{ textAlign: 'center' }}>Faça seu login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span style={{ color: 'red' }}>{msgError.msg}</span>
                            {msgSucess.length > 0 &&
                                <span style={{ color: '#66bb6a' }}>{msgSucess}</span>
                            }
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cpf"
                            label="CPF"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            helperText={error ? (<span style={{ color: 'red' }}>{msgError.cpf}</span>) : ''}
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Senha"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={error ? (<span style={{ color: 'red' }}>{msgError.password}</span>) : ''}
                        />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={handleSignInClose}>Cancelar</Button>
                        <Button onClick={handleSubmit}>Entrar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};