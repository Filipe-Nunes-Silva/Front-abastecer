import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from '../../contexts/Context';

const VerifyAuth = ({ children }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (!state.user.isLogged) {
            navigate('/acess');
        };
    }, []);

    if (state.user.isLogged) {
        return (
            children
        );
    }
    else {
        return null;
    };
};

export default VerifyAuth;